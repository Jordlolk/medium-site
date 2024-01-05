const profilePic = document.getElementById('profilePic'),
profileNameHtml = document.getElementById('profileName'),
profileEmailHtml = document.getElementById('profileEmail'),
HelloPhrase = document.querySelector('h1')
let userLoggedIn = JSON.parse(localStorage.getItem('userLoggingIn'))

/* Iniciate personalizing */
HelloPhrase.innerHTML = `Hello ${userLoggedIn.username}!`
profileEmailHtml.innerHTML = userLoggedIn.email
profileNameHtml.innerHTML = userLoggedIn.username
profilePic.src = userLoggedIn.profile
