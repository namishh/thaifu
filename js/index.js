// Navigation
const navToggle = document.querySelector('.navbar-toggle-wrapper')
const navBtn = document.querySelector('.navbar-toggle')
const navbar = document.querySelector('.navbar')

navToggle.addEventListener('click', () => {
  navbar.classList.toggle('navbar-visible')
  navBtn.classList.toggle('navbar-toggle-active')
})

// Menu
const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(el => {
      el.classList.remove("menu-food-active")
    })
    tabs.forEach(el => {
      el.classList.remove("menu-item-active")
    })
    tab.classList.add('menu-item-active')
    target.classList.add("menu-food-active")
  })
})