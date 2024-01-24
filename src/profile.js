
const profilePic = document.getElementById('profilePic'),
profileNameHtml = document.getElementById('profileName'),
profileEmailHtml = document.getElementById('profileEmail'),
HelloPhrase = document.querySelector('h1'),
textMainContent = document.querySelector('.text'),
changeTheme = document.getElementById('changeTheme'),
hoursHtml = document.getElementById('hours'),
menuDateChange = document.querySelectorAll('.calendar-button'),
daysOfTheMonth = document.querySelectorAll('[data-js="days"]'),
monthHtmlcontent = document.querySelector('[data-month="month"]'),
menuDays = document.getElementById('menuDays')
let userLoggedIn = JSON.parse(localStorage.getItem('loggedUser'))

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

HelloPhrase.innerHTML = `Hello ${capitalize(userLoggedIn[0].username)}👋`
profilePic.src = userLoggedIn[0].profile

const dropList = document.getElementById('test')
const showList = () => {
  let computedStyle = window.getComputedStyle(dropList)
    if(computedStyle.display === 'none'){
        dropList.style.display = 'flex'
      }
}
profilePic.addEventListener('mouseenter' , showList)
dropList.addEventListener('mouseleave' , () => {
  dropList.style.display = 'none';
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
const calendarContainer = document.querySelector(".calendar-content");
const table = document.querySelector('.calendar') 
const currentDate = new Date();

function createCalendar(year, month) {
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

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
          //dia de ontem    
          const lastMonth = month - 1 < 0 ? 11 : month - 1;
          const lastMonthYear = month - 1 < 0 ? year - 1 : year;
          const lastMonthDays = new Date(lastMonthYear, lastMonth + 1, 0).getDate();
          const dayOfLastMonth = lastMonthDays - (firstDay - j) + 1;
          cell.innerText = dayOfLastMonth
          cell.classList.add('yesterDays')
          continue;
        }
        
        if (dayCounter > daysInMonth) {
          // No more days in the month, break the loop
          const nextMonth = month + 1 > 11 ? 1 : month + 1;
          const nextMonthYear = month + 1 > 11 ? year + 1 : year;
          const dayOfnextMonth = new Date(nextMonthYear, nextMonth, 1).getDate();
          cell.innerText = dayOfnextMonth
          cell.classList.add('yesterDays')
          break;
        }
        monthHtmlcontent.innerHTML = monthNames[month]
        cell.textContent = dayCounter;
        row.classList.add('week')
        cell.classList.add('days')
        cell.addEventListener("click", handleClick);

        dayCounter++;
      }
    }
    calendarContainer.appendChild(table);
}
document.addEventListener("DOMContentLoaded", function () {
  createCalendar(currentDate.getFullYear(), currentDate.getMonth())
});
const handleClick = (e) => {
  console.log(e.target);
}
let count = 1
const nextDate = (e) => {
  if(e.target.innerText === ">"){
      currentDate.setMonth(currentDate.getMonth()+1)
  } else {
      currentDate.setMonth(currentDate.getMonth()-1)
  }
  let year = currentDate.getFullYear()
  let month = currentDate.getMonth()
  table.innerHTML = ''
  createCalendar(year ,month)
}
menuDateChange.forEach(button => {
    button.addEventListener('click' , nextDate)
})

