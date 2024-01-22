
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

const dropList = document.getElementById('test')
const hideList = () => {
  dropList.style.display = 'none';
};
const showList = () => {
  let computedStyle = window.getComputedStyle(dropList)
    if(computedStyle.display === 'none'){
        dropList.style.display = 'flex'
      }
}
profilePic.addEventListener('mouseenter' , showList)
dropList.addEventListener('mouseleave' , () => {
  hideList()
})
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

changeTheme.addEventListener('click' , changeThemeWebSite)

document.addEventListener('DOMContentLoaded', function() {
  let windowLength = window.innerWidth
  let textContent = textMainContent.children[0].innerText
  let textHalfContent = Math.floor(textContent.length/2-1)
  let appendedElement ;
  if(windowLength < 720){
      textMainContent.children[0].innerHTML = textContent.slice(0 , textHalfContent)
      let newText = document.createElement('p')
      appendedElement = newText
      newText.innerHTML = textContent.slice(textHalfContent, textContent.length)
      textMainContent.appendChild(newText)
      textMainContent.classList.add('sectionTwoModText')
  } else {
      textMainContent.classList.remove('sectionTwoModText')
      if (appendedElement  && textMainContent.contains(appendedElement)){
          textMainContent.removeChild(appendedElement)
      }
  } 
});

//--------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.querySelector(".calendar-content");

  function createCalendar(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const table = document.querySelector('.calendar')
    const headerRow = table.insertRow();

    for (let day = 0; day < 7; day++) {
      const th = document.createElement("th");
      th.textContent = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][day];
      headerRow.appendChild(th);
    }

    let dayCounter = 1;

    for (let i = 0; i < 5; i++) {
      const row = table.insertRow();

      for (let j = 0; j < 7; j++) {
        const cell = row.insertCell();

        if (i === 0 && j < firstDay) {
          // Empty cells before the first day
          continue;
        }

        if (dayCounter > daysInMonth) {
          // No more days in the month, break the loop
          break;
        }
        row.classList.add('week')
        cell.classList.add('days')
        cell.textContent = dayCounter;
        cell.addEventListener("click", handleClick);

        dayCounter++;
      }
    }
    
    calendarContainer.innerHTML = '';
    calendarContainer.appendChild(table);
  }
  const currentDate = new Date();
  createCalendar(currentDate.getFullYear(), currentDate.getMonth());
});
const handleClick = (e) => {
    console.log(e);
}