
const profilePic = document.getElementById('profilePic'),
profileNameHtml = document.getElementById('profileName'),
profileEmailHtml = document.getElementById('profileEmail'),
HelloPhrase = document.querySelector('h1'),
textMainContent = document.querySelector('.text'),
changeTheme = document.getElementById('changeTheme'),
hoursHtml = document.getElementById('hours'),
daysOfTheMonth = document.querySelectorAll('[data-js="days"]'),
monthHtmlcontent = document.querySelector('[data-month="month"]'),
menuDays = document.getElementById('menuDays')
let userLoggedIn = JSON.parse(localStorage.getItem('userLoggingIn'))
console.log(daysOfTheMonth);

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
profilePic.src = userLoggedIn.profile
const showList = () => {
  const dropList = document.getElementById('test')
    if(dropList.style.display === 'none'){
        dropList.style.display = 'flex'
    }else {
        dropList.style.display = 'none'
    }
}

let texts = document.querySelectorAll('[data-text="texts"]'),
dropListBorder = document.querySelectorAll('[data-dropList="border"]'),
dropListBackground = document.querySelectorAll('[data-dropList="background"]'),
backgroundColor = document.querySelectorAll('[data-background="background"]')

const changeColorText = (array) => {
    if(array){
      console.log(array[0].attributes[0]);
    }
}

const changeThemeWebSite = () => {

    if(changeTheme.name === 'Moon'){
      dropListBackground[0].style.borderColor = 'white'
      backgroundColor.forEach(element => {
        element.style.backgroundColor = 'black'
      })
      dropListBackground.forEach(element => {
        element.style.backgroundColor = 'black'
      })
      dropListBorder.forEach(element => {
        element.style.backgroundColor = 'white'
      })
      texts.forEach(element => {
        element.style.color = 'white'
      })
      changeTheme.innerHTML = '&#127774'
      changeTheme.name = 'Sun'
    } 
    else {
      dropListBackground[0].style.borderColor = 'black'
      backgroundColor.forEach(element => {
        element.style.backgroundColor = 'white'
      });
      dropListBackground.forEach(element => {
        element.style.backgroundColor = 'white'
      })
      dropListBorder.forEach(element => {
        element.style.backgroundColor = 'black'
      })
      texts.forEach(element => {
          element.style.color = 'black'
      });
      changeTheme.innerHTML = '&#127769'
      changeTheme.name = 'Moon'
    }
}
profilePic.addEventListener('click' , showList)
changeTheme.addEventListener('click' , changeThemeWebSite)

document.addEventListener('DOMContentLoaded', function() {
  let windowLength = window.innerWidth
  let textContent = textMainContent.children[0].innerText
  let textHalfContent = Math.floor(textContent.length/2-1)
  if(windowLength < 720){
      textMainContent.children[0].innerHTML = textContent.slice(0 , textHalfContent)
      let newText = document.createElement('p')
      newText.innerHTML = textContent.slice(textHalfContent, textContent.length)
      textMainContent.appendChild(newText)
      textMainContent.classList.add('sectionTwoModText')
  } else {
      textMainContent.classList.remove('sectionTwoModText')
  } 
});

let data = new Date()

let yearMonthDay = [data.getFullYear() , 0, 1]
let firstDay = new Date(yearMonthDay[0] , yearMonthDay[1] , yearMonthDay[2])
let lastDay = new Date(yearMonthDay[0] , yearMonthDay[1], yearMonthDay[2]+30)
const days = []
for(let day = 1 ; day <= lastDay.getDate() ; day++){
  days.push(day)
}
const monthArray = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const month30days = ['Abril' , 'Junho' , 'Setembro' , 'Dezembro']

for(let months = 0 ; months < monthArray.length ; months++){
  let currentMonth = monthArray[firstDay.getMonth()+months]
  let td = document.createElement('td')
  td.setAttribute('data-js' , 'days')
  if(month30days.includes(currentMonth) && data.getFullYear() % 4 === 0){
    days.pop()
    monthHtmlcontent.innerHTML =  `${month30days[currentMonth]}`
    td.innerHTML =  days[months]
    days.push(31)
  } else {
    monthHtmlcontent.innerHTML = `${monthArray[data.getMonth()]}`
    td.innerHTML = days[months]
  }
  menuDays.appendChild(td)
}