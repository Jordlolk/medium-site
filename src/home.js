const profilePic = document.getElementById('profilePic'),
profileName = document.getElementById('profileName'),
profileEmail = document.getElementById('profileEmail')
console.log(profileEmail , profileName , profilePic);
let userLoggedIn = JSON.parse(localStorage.getItem('userLoggingIn'))
console.log(userLoggedIn);
/* profilePic.src = `${userLoggedIn.profile}`
profileName.innerHTML = userLoggedIn.username
profileEmail.innerHTML = userLoggedIn.email */