const profilePic = document.getElementById('profilePic'),
profileName = document.getElementById('profileName'),
profileEmail = document.getElementById('profileEmail'),
profilePagePc = document.getElementById('profilePagePc')
let userLoggedIn = JSON.parse(localStorage.getItem('userLoggingIn'))

document.addEventListener("DOMContentLoaded", function() {
  
  const menuButton = document.createElement("button");
  const link = document.createElement("a")
  link.innerHTML = "&#9776"
  link.href = 'profile.html'
  menuButton.appendChild(link)
  link.classList.add('a')
  menuButton.classList.add("buttonMobile");

  const ul = document.querySelector("ul");
  ul.appendChild(menuButton);
  function adjustMenuForScreenWidth(){
    const screenWidth = window.innerWidth;
    if (screenWidth < 699) {
      profilePagePc.style.display = "none";
      menuButton.style.display = "block";
      ul.appendChild(menuButton)
    } else {
      profilePagePc.style.display = "block";
      menuButton.style.display = "block";
      menuButton.remove()
    }
}

  // Adicionar ouvintes de eventos
  window.addEventListener("resize", adjustMenuForScreenWidth);
  adjustMenuForScreenWidth(); // Chama a função inicialmente
});


