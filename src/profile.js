const profilePic = document.getElementById('profilePic'),
profileNameHtml = document.getElementById('profileName'),
profileEmailHtml = document.getElementById('profileEmail'),
HelloPhrase = document.querySelector('h1'),
hoursHtml = document.getElementById('hours')
let userLoggedIn = JSON.parse(localStorage.getItem('userLoggingIn'))

/* Iniciate personalizing */
function updateTime(){
  let hours = new Date()
let formattedHours = hours.getHours().toString().padStart(2, '0');
let formattedMinutes = hours.getMinutes().toString().padStart(2, '0');
let formattedSeconds = hours.getSeconds().toString().padStart(2, '0');
hoursHtml.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}
setInterval(updateTime , 1000)
updateTime()
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

HelloPhrase.innerHTML = `Hello ${capitalize(userLoggedIn.username)}👋`
profileEmailHtml.innerHTML = userLoggedIn.email
profileNameHtml.innerHTML = userLoggedIn.username
profilePic.src = userLoggedIn.profile
