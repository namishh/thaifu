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

// Reviews
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

// Lazy Loading Images

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

// Reveal Elements On Scroll
const sections = document.querySelectorAll('.section')

const secObserver = new IntersectionObserver((entries, observer) => {
    const [entry] = entries

    if(!entry.isIntersecting) return

    entry.target.classList.add('section-visible')
    observer.unobserve(entry.target)

}, {
  root : null,
  threshold : 0.1,
  rootMargin : "0px 0px 100px 0px"
})

sections.forEach(function(section) {
  secObserver.observe(section)
  section.classList.add('section--hidden')
})


// Intro Animation
const timeline = gsap.timeline({defaults : {ease : "power1.out"}})
timeline.to('.intro-text', {y : '0%', duration : 0.8, stagger : 0.25, delay : 0.2})
timeline.to('.intro', {y : '-100%', duration : 0.8, stagger : 0.25, delay:1})

// Smooth Scroll
const links = document.querySelectorAll('[data-link]')
const linkList = [links]
const addSmoothScroll = (linkList) => {
  linkList.forEach(list => {
    list.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        navbar.classList.add('navbar-sticky')
        const section = document.querySelector(`.${link.dataset.link}`)
        const coordinates = section.getBoundingClientRect()
        window.scrollTo({
            left : coordinates.left + window.pageXOffset, 
            top : coordinates.top + window.pageYOffset - 30,
            // Adding behavior
            behavior : "smooth"
        })
      })
    })
  })
}

addSmoothScroll(linkList)