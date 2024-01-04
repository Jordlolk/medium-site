const profilePic = document.getElementById('profilePic'),
profileName = document.getElementById('profileName'),
profileEmail = document.getElementById('profileEmail'),
profilePagePc = document.getElementById('profilePagePc')
let userLoggedIn = JSON.parse(localStorage.getItem('userLoggingIn'))
console.log(userLoggedIn);

/* const loadProfilePage = (e) => {
    window.location.href = ''
}
profilePage.addEventListener('click' , loadProfilePage)
 */

/* profilePic.src = `${userLoggedIn.profile}`
profileName.innerHTML = userLoggedIn.username
profileEmail.innerHTML = userLoggedIn.email */

document.addEventListener("DOMContentLoaded", function() {
  // Criar botão de menu
  const menuButton = document.createElement("button");
  menuButton.innerHTML = '&#9776'
  menuButton.classList.add("buttonMobile");

  // Adicionar botão ao DOM
  const ul = document.querySelector("ul");
  ul.appendChild(menuButton);

  // Função para verificar a largura da tela e ajustar a visibilidade
  function adjustMenuForScreenWidth(){
    const screenWidth = window.innerWidth;
    if (screenWidth < 699) {
      profilePagePc.style.display = "none";
      menuButton.style.display = "block";
    } else {
      profilePagePc.style.display = "block";
      menuButton.style.display = "none";
    }
  }

  // Adicionar ouvintes de eventos
  window.addEventListener("resize", adjustMenuForScreenWidth);
  adjustMenuForScreenWidth(); // Chama a função inicialmente
});
