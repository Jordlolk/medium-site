const getters = document.querySelectorAll('.getters'),
resultEmail = document.getElementById('resultEmail'),
resultPassWord = document.getElementById('resultPassword'),
inputEmail = document.getElementById('email'),
inputPassWord = document.getElementById('password'),
form = document.getElementById('form')

let emailText = ''
let psswordText = ''

const handleInput = (e) => {
      let inputType = e.target.id
      let text = e.target.value
      if(inputType === 'email'){
          emailText = text
          checkEmail(emailText)
      } else {
          psswordText = text
          checkPassowrd(psswordText)
      }
}

const checkEmail = (emailText) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/
  const limitEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  resultEmail.style.transition = '0.3s ease-in-out'
  if(regex.test(emailText) && emailText.includes('@')){
        inputEmail.classList.remove('invalid')
        inputEmail.classList.add('valid')
        resultEmail.style.color = 'transparent' 
        return true
    } 
    if(emailText === '' || emailText[0].includes('@')) {
        inputEmail.classList.add('invalid')
        resultEmail.style.color = 'white' 
        resultEmail.innerHTML = `Type a E-mail!`
        return false
    }
    if(limitEmail.test(emailText)){
        inputEmail.classList.add('invalid')
        resultEmail.style.color = 'white' 
        resultEmail.innerHTML = `Limit exceeded , 2 or 3 letters after the last point`
        inputEmail.value = ''
    }
}

const checkPassowrd = (psswordText) => {
  resultPassWord.style.transition = '0.3s ease-in-out'
  if(psswordText.length > 4){
      inputPassWord.classList.remove('invalid')
      inputPassWord.classList.add('valid')
      resultPassWord.style.color = 'transparent'
      return true
  } else {
      inputPassWord.classList.remove('valid')
      inputPassWord.classList.add('invalid')
      resultPassWord.style.color = 'white'
      if (psswordText === ''){
        resultPassWord.innerHTML = "Type a password!"
        return false
      }
      resultPassWord.innerHTML = "The default is 4 characters!"
      return false
  }
}
getters.forEach((input) => {
  input.children[1].addEventListener('input' , handleInput)
})

form.addEventListener('submit' , logginIn)

function logginIn(e){
  e.preventDefault()
  /*
  if(checkEmail(emailText) && checkPassowrd(psswordText)){

  } */
  let usersArray  = JSON.parse(localStorage.getItem('users'))
  for(let count = 0 ; count < usersArray.length ; count++){
     let usersSaved = JSON.parse(localStorage.getItem('loggedUser'))
     let email = usersArray[count].email
     let name = usersArray[count].username
     let pssword = usersArray[count].password
     if(email === emailText && psswordText === pssword){
       if(usersSaved[count].username === name){
         localStorage.setItem('userLoggingIn' , JSON.stringify(usersSaved[count]))
         localStorage.getItem('userLoggingIn')
        }
        window.location.href = 'home.html'
      }
  }
}


