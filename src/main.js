const getters = document.querySelectorAll('.getters'),
checkbox = document.getElementById('keepLoggedIn'),
resultEmail = document.getElementById('resultEmail'),
resultSenha = document.getElementById('resultSenha'),
resultImg = document.getElementById('resultprofile'),
form = document.getElementById('form'),
inputEmail = document.getElementById('email'),
inputSenha = document.getElementById('senha'),
inputImg = document.getElementById('imgprofile')
let count = 1

getters.forEach((input) => {
    input.children[1].addEventListener('input' , handleInput)
})

let emailText = null
let senhaText = null
let imgLinkText = ''
/* Getting the user inputs */
function handleInput(e){
    e.preventDefault()
    if(e.target.name === "email"){
        emailText = e.target.value
        checkEmail(emailText)
    }
    if(e.target.name === "senha"){
        senhaText = e.target.value
        checkPassowrd(senhaText)
    }
    if(e.target.name === "imgprofile"){
        imgLinkText = e.target.value
        checkImgLink(imgLinkText)
    }
}
/* checking all data */
function checkEmail(email){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
    const limitEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    resultEmail.style.transition = '0.3s ease-in-out'
    if(regex.test(email)){
        inputEmail.classList.remove('invalid')
        inputEmail.classList.add('valid')
        resultEmail.style.color = 'transparent' 
        return true
    } else if (email === '' || email[0].includes('@')) {
        resultEmail.innerHTML = `Insira um E-mail!`
        return false
    } else {
        resultEmail.style.color = 'white'
        inputEmail.classList.remove('valid')
        inputEmail.classList.add('invalid')
        if(limitEmail.test(email)){
            resultEmail.innerHTML = "Limite Excedido!"
        } else {
            resultEmail.innerHTML = "Sinal de @ necessário"
        }
        return false
    }
}
function checkPassowrd(senha){
    resultSenha.style.transition = '0.3s ease-in-out'
    if(senha.length > 4){
        inputSenha.classList.remove('invalid')
        inputSenha.classList.add('valid')
        resultSenha.style.color = 'transparent'
        return true
    } else {
        inputSenha.classList.remove('valid')
        inputSenha.classList.add('invalid')
        if (senha === ''){
            resultSenha.innerHTML = "Insira uma senha !"
            return false
        }
        resultSenha.innerHTML = "Padrão é mais de 4 caracteres !"
        resultSenha.style.color = 'white'
        return false
    }
}

function checkImgLink(link){
    const regexLink = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    resultImg.style.transition = '0.3s ease-in-out'
    if(regexLink.test(link)){
        inputImg.classList.remove('invalid')
        inputImg.classList.add('valid')
        resultImg.style.color = 'transparent'
        return true
    } else {
        inputImg.classList.remove('valid')
        inputImg.classList.add('invalid')
        if(link === ''){
            resultImg.innerHTML = "Foto de perfil padrão"
            return true
        }
        resultImg.innerHTML = "Link incorreto !"
        resultImg.style.color = 'white'
        return false
    }
}

/* end of check */

form.addEventListener('submit' , newUser)
const usersData = {
        users : []
}
function newUser(e){
    e.preventDefault()
    if(checkEmail(emailText) && checkPassowrd(senhaText) && checkImgLink(imgLinkText)){
        if(checkbox.checked){
            let name = emailText.split('@')[0]
            const user = {
                id : count,
                email : emailText,
                username : name,
                password : senhaText,
                profile : imgLinkText === '' ? '../public/img/profile_standardImg.png' : imgLinkText
            }
            saveUser(user)
            count += 1
        } else {
            window.location.href = 'home.html';
        }
    }
}

//j0rd4ll3fs1lv41234
function saveUser(newUser){
    // Get the list of localStorage
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];
    console.log();
    // cheking with the user already exists
    if (users.some(user => user.id === newUser.id)){
        let res = window.confirm(`User: ${newUser.username} already exists , is that you?`);
        res ? window.location.href = 'home.html' : window.alert('change your data.');
        return;
    }
    // queue new user 
    users.push(newUser);
    // save the array of users on local storage and set the max length
    localStorage.setItem('users', JSON.stringify(users));
    let localStorageLength =  JSON.parse(localStorage.getItem('users')).length
    if(localStorageLength > 10){
        window.alert('The local storage will be clear :)')
        localStorage.clear()
    }
    window.alert(`User ${newUser.username} queue with sucess , send you to Home!`);
    users = []
    window.location.href = 'home.html'
    return true;
}
