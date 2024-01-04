const getters = document.querySelectorAll('.getters'),
checkbox = document.getElementById('keepLoggedIn'),
resultEmail = document.getElementById('resultEmail'),
resultSenha = document.getElementById('resultPassword'),
resultImg = document.getElementById('resultprofile'),
form = document.getElementById('form'),
inputEmail = document.getElementById('email'),
inputSenha = document.getElementById('password'),
inputImg = document.getElementById('imgprofile')


getters.forEach((input) => {
    input.children[1].addEventListener('input' , handleInput)
})

let emailText = ''
let psswordText = ''
let imgLinkText = ''
/* Getting the user inputs */
function handleInput(e){
    e.preventDefault()
    if(e.target.name === "email"){
        emailText = e.target.value
        checkEmail(emailText)
    }
    if(e.target.name === "password"){
        psswordText = e.target.value
        checkPassowrd(psswordText)
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
    if(regex.test(email) && email.includes('@')){
        inputEmail.classList.remove('invalid')
        inputEmail.classList.add('valid')
        resultEmail.style.color = 'transparent' 
        return true
    } 
    if(email === '' || email[0].includes('@')) {
        inputEmail.classList.add('invalid')
        resultEmail.style.color = 'white' 
        resultEmail.innerHTML = `Type a E-mail!`
        return false
    }
    if(limitEmail.test(email)){
        inputEmail.classList.add('invalid')
        resultEmail.style.color = 'white' 
        resultEmail.innerHTML = `Limit exceeded , 2 or 3 letters after the last point`
        inputEmail.value = ''
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
        resultSenha.style.color = 'white'
        if (senha === ''){
            resultSenha.innerHTML = "Insira uma senha !"
            return false
        }
        resultSenha.innerHTML = "Padrão é mais de 4 caracteres !"
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

const getLastUserId = () => {
    const lastId = localStorage.getItem('lastUserID');
    return lastId ? parseInt(lastId) : 1;
}

const updateUserId = (count) => {
    localStorage.setItem('lastUserID' , count.toString())
}

let count = getLastUserId()
function newUser(e){
    e.preventDefault()
    if(checkEmail(emailText) && checkPassowrd(psswordText) && checkImgLink(imgLinkText)){
        let name = emailText.split('@')[0]
        const user = {
            id : count,
            email : emailText,
            username : name,
            password : psswordText,
            profile : imgLinkText === '' ? './public/img/profile_standardImg.png' : imgLinkText
        }
        saveUser(user)
        if(checkbox.checked){
            let usersSaved = localStorage.getItem('loggedUser')
            usersSaved = usersSaved ? JSON.parse(usersSaved) : []
            usersSaved.push(user)
            localStorage.setItem('loggedUser' , JSON.stringify(usersSaved))
            usersSaved = []
            /* 
               This part is very complex , I know that isn´t the way to keep the data of users.
               However , to simulate this, I used the localStorage just to stay up  until the Home page and
               than delete the data to reduce the complexity of the code 
            */
           return ;
        }
        return;
    }
}

//j0rd4ll3fs1lv41234
function saveUser(newUser){
    // Get the list of localStorage
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];
    // cheking with the user already exists
    if(users.some(user => user.email === newUser.email && user.password === newUser.password)){
        let res = window.confirm(`User: ${newUser.username} already exists , is that you?`);
        res ? window.location.href = 'home.html' : window.alert('change your data.');
        return;
    }
    // queue new user 
    users.push(newUser)
    
    // save the array of users on local storage and set the max length
    localStorage.setItem('users', JSON.stringify(users));
    let localStorageLength =  JSON.parse(localStorage.getItem('users')).length
    count += 1
    updateUserId(count)
    if(localStorageLength > 10){
        window.alert('The local storage will be clear :)')
        localStorage.clear()
        updateUserId(1); // Restart the count 
        count = 1;
    }
    window.alert(`User ${newUser.username} queue with sucess , send you to Home!`);
    users = []
    window.location.href = 'home.html'
    return true;
}
