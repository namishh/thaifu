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

// Smooth Scroll
const links = document.querySelectorAll('[data-link]')
// const learnMore = document.querySelectorAll('')
const linkList = [links]
const addSmoothScroll = (linkList) => {
  linkList.forEach(list => {
    list.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        navbar.classList.add('navbar-sticky')
        const section = document.querySelector(`.${link.dataset.link}`)
        section.classList.add('section-visible')
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

// Animations
gsap.registerPlugin(ScrollTrigger)


// Intro Animation
const timeline = gsap.timeline({defaults : {ease : "power1.out"}})
timeline.to('.intro-text', {y : '0%', duration : 0.8, stagger : 0.25, delay : 0.2})
timeline.to('.intro', {y : '-100%', duration : 0.8, stagger : 0.25, delay:1})

// Home
const heroTimeline = gsap.timeline()
heroTimeline.from(".hero-img", {x : 200, opacity: 0, duration : 1, stagger : 0.25, delay : 3.3})
heroTimeline.from(".hero-text-container", {x : -200, opacity: 0, duration : 1, stagger : 0.25, delay : -1})


// About 
const aboutTimeline = gsap.timeline({
  scrollTrigger : ".section-about-us",
  start : "center bottom"
})

aboutTimeline.from(".about-us-image", {x : -200, opacity : 0, duration : .8, stagger : 0.25})
             .from('.about-us-texts', {x : 200, opacity : 0, duration : .8, delay : -.8})

// Features
const featuresTimeline = gsap.timeline({
  scrollTrigger : ".section-features",
  start : "center bottom"
})

featuresTimeline.from(".card-1", {x : -300, opacity : 0, duration : 1, stagger : 0.25})
.from(".card-2", {x : 300, opacity : 0, duration : 1, stagger : 0.25 , delay : -1})

const featuresTimeline2 = gsap.timeline({
  scrollTrigger : ".card-3",
  start : "center bottom"
})

featuresTimeline2.from(".card-3", {x : -300, opacity : 0, duration : 1, stagger : 0.25})
.from(".card-4", {x : 300, opacity : 0, duration : 1, stagger : 0.25 , delay : -1})


// Menu
const menuTimeline = gsap.timeline({
  scrollTrigger : ".section-menu",
  start : "center bottom"
})


menuTimeline.from(".menu-list", {opacity : 0, duration : 1, stagger : 0.25 })
            .from(".menu-item-1", {x : -200, opacity : 0, duration : 1, stagger : 0.25, delay : -.8})  
            .from(".menu-item-3", {x : 200, opacity : 0, duration : 1, stagger : 0.25,  delay : -.8 }) 
            .from(".menu-item-2", {opacity : 0, duration : 1, stagger : 0.25,  delay : -.8 })  
            .from(".menu-content", {y : -50, opacity : 0, duration : .7, stagger : 0.25,  delay : -.5 })
            
// Reviews
const reviewTimeline = gsap.timeline({
  scrollTrigger : ".section-reviews",
  start : "center bottom"
})

reviewTimeline.from('.carousel', {x : -200, opacity: 0, duration : 1})
              .from('#btn-next', {opacity : 0, duration : 1, stagger : 0.25, delay : -.5})
              .from('#btn-prev', {opacity : 0, duration : 1, delay : -.5,  stagger : 0.25})

// Gallery
const galleryTimeline = gsap.timeline({
  scrollTrigger : ".section-gallery",
  start : "center bottom"
})

galleryTimeline.from(".gallery-container", {opacity : 0, duration : 1, stagger : 0.25 })

// Form
const form = document.querySelector('.form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  window.location.reload()
})

const contactTimeline = gsap.timeline({
  scrollTrigger : ".section-contact",
  start : "center bottom"
})


contactTimeline.from('.contact-img', {x : -200, opacity: 0, duration : 1})
              .from('.form', {x: 200, opacity : 0, duration : 1, stagger : 0.25, delay : -.5})
         