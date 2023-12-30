const getters = document.querySelectorAll('.getters'),
resultEmail = document.getElementById('resultEmail'),
resultSenha = document.getElementById('resultSenha'),
resultImg = document.getElementById('resultprofile'),
form = document.getElementById('form'),
inputEmail = document.getElementById('email'),
inputSenha = document.getElementById('senha'),
inputImg = document.getElementById('imgprofile')

getters.forEach((input) => {input.children[1].addEventListener('input' , handleInput)})

let emailText = null;
let senhaText = null;
let imgLinkText = null;
function handleInput(e){
    e.preventDefault();
    if(e.target.name === "email"){
        emailText = e.target.value;
        verifyEmail(emailText)
    }
    if(e.target.name === "senha"){
        senhaText = e.target.value;
        verifyPassowrd(senhaText)
    }
    if(e.target.name === "imgprofile"){
        imgLinkText = e.target.value;
        verifyImgLink(imgLinkText)
    }
}
function verifyEmail(email){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    resultEmail.style.transition = '0.3s ease-in-out'
    if(regex.test(email) || email.substring(1).includes('@')){
        inputEmail.classList.remove('invalid')
        inputEmail.classList.add('valid')
        resultEmail.style.color = 'transparent' ;
    } else if (email === '') {
        inputEmail.classList.remove('valid')
        inputEmail.classList.add('invalid')
        resultEmail.innerHTML = "Insira um E-mail!"
    } else {
        inputEmail.classList.remove('valid')
        inputEmail.classList.add('invalid')
        resultEmail.innerHTML = "Sinal de @ necessário";
        resultEmail.style.color = 'white'
    }
}
function verifyPassowrd(senha){
    resultSenha.style.transition = '0.3s ease-in-out'
    if(senha.length > 4){
        inputSenha.classList.remove('invalid')
        inputSenha.classList.add('valid')
        resultSenha.style.color = 'transparent'
    } else if (senha === ''){
        inputSenha.classList.remove('valid')
        inputSenha.classList.add('invalid')
        resultSenha.innerHTML = "Insira uma senha !"
    }
    else {
        inputSenha.classList.remove('valid')
        inputSenha.classList.add('invalid')
        resultSenha.innerHTML = "Precisa conter 4 caracteres !"
        resultSenha.style.color = 'white';
    }
}
function verifyImgLink(link){
    const regexLink = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    resultImg.style.transition = '0.3s ease-in-out'
    if(regexLink.test(link)){
        inputImg.classList.remove('invalid')
        inputImg.classList.add('valid')
        resultImg.style.color = 'transparent'
    } else if (link === ''){
        inputImg.classList.remove('valid')
        inputImg.classList.add('invalid')
        resultImg.innerHTML = "Foto de perfil padrão"
    }
    else {
        inputImg.classList.remove('valid')
        inputImg.classList.add('invalid')
        resultImg.innerHTML = "Link incorreto !"
        resultImg.style.color = 'white';
    }
}