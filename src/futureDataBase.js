//j0rd4ll3fs1lv41234
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'usersDB',
});

function queueUser(usuario) {
  
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }

    connection.query('SELECT * FROM saved WHERE email = ?', [usuario.email], (err, results) => {
      if (err) {
        console.error('Erro ao verificar usuário existente:', err);
        connection.end();
        return;
      }
      if (results.length > 0) {
        console.log(`Usuário com email ${usuario.email} já existe. Não será adicionado.`);
        connection.end();
        return;
      }

      connection.query('INSERT INTO saved (name, email, passowrd) VALUES (?, ?, ?)',
        [usuario.username, usuario.password, usuario.email],
        (err, results) => {
          if (err) {
            console.error('Erro ao adicionar usuário:', err);
          } else {
            console.log(`Usuário ${usuario.nome} adicionado com sucesso!`);
          }

          connection.end();
        }
      );
    });
  });
}