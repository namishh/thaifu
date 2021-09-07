const navToggle = document.querySelector('.navbar-toggle-wrapper')
const navBtn = document.querySelector('.navbar-toggle')
const navbar = document.querySelector('.navbar')

navToggle.addEventListener('click', () => {
  navbar.classList.toggle('navbar-visible')
  navBtn.classList.toggle('navbar-toggle-active')
})