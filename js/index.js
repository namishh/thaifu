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

// Carousel
const carousel = document.querySelector('.carousel-inner')
const carouselItems = document.querySelectorAll('.carousel-slide')

const nextBtn = document.querySelector("#btn-next")
const prevBtn = document.querySelector("#btn-prev")

let counter = 0
let size = carouselItems[0].clientWidth

// Change Size ON Resize
const sizeChange = () => {
  size = carouselItems[0].clientWidth
}
window.onresize = sizeChange

nextBtn.addEventListener("click", () => {
  counter++
  if(counter >= 4){
    counter = 0
  }
  carousel.style.transform = `translateX(${-size * counter }px)`
})

prevBtn.addEventListener("click", () => {
  counter--
  if(counter < 0){
    counter = 3
  }
  carousel.style.transform = `translateX(${-size * counter}px)`
})

// Lazy Loading

const preloadImage = (image) => {
  image.classList.remove("img-blur")
  image.src = image.dataset.src
}

const images = document.querySelectorAll('[data-src]')
const options = {
  threshold: 0,
  rootMargin : "0px 0px 600px 0px"
}
const imgObserver = new IntersectionObserver((entries, imgObserver)=> {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return
    preloadImage(entry.target)
    imgObserver.unobserve(entry.target)
  })
}, options)

images.forEach(image => {
  imgObserver.observe(image)
})