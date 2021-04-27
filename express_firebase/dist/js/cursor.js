const updateProperties = (elem, state) => {
    elem.style.setProperty('--x', `${state.x}px`)
    elem.style.setProperty('--y', `${state.y}px`)
    elem.style.setProperty('--width', `${state.width+10}px`)
    elem.style.setProperty('--height', `${state.height+10}px`)
    elem.style.setProperty('--radius', state.radius)
    elem.style.setProperty('--scale', state.scale)
  }
  
document.querySelectorAll('.cursor').forEach(cursor => {
    const createState = e => {
      const defaultState = {
        x: e.clientX,
        y: e.clientY,
        width: 40,
        height: 40,
        radius: '50%'
      }
  
      return {
        ...defaultState
      }
    }
  
    document.addEventListener('mousemove', e => {
      const state = createState(e)
      updateProperties(cursor, state)
    })
})

var cursorE = document.querySelector('.cursor');
var htmlE = document.querySelector("html");

var footer = document.querySelector('.footer');

var button1 = document.querySelector(".navbar .logout")
var button2 = document.querySelector(".navbar .register")
var button3 = document.querySelector(".navbar .login")
var button4 = document.querySelector(".navbar .edit")
var button5 = document.querySelector(".mainScreen .four")
var button6 = document.querySelector(".footer .shamelessPlug")
var button7 = document.querySelector(".errorPopup .fa-times")
var button8 = document.querySelector(".mainScreen .fa-facebook-square")
var button9 = document.querySelector(".mainScreen .fa-instagram")

button1.addEventListener('mouseover', () => {cursorE.style.width = "30px"; cursorE.style.height = "30px"})
button1.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button2.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button2.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button3.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button3.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button4.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button4.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button5.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button5.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button6.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button6.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button7.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button7.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button8.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button8.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

button9.addEventListener('mouseover', () => {cursorE.style.width = "40px"; cursorE.style.height = "40px"})
button9.addEventListener('mouseout', () => {cursorE.style.width = "50px"; cursorE.style.height = "50px"})

footer.addEventListener("mouseover", () => {
  htmlE.style.cursor = `url("data:image/svg+xml,%3Csvg height='9' width='9' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' fill='%23fff' r='4'/%3E%3C/svg%3E") 4 4, auto`
})
footer.addEventListener("mouseout", () => {
  htmlE.style.cursor = `url("data:image/svg+xml,%3Csvg height='9' width='9' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='4' cy='4' fill='%23000' r='4'/%3E%3C/svg%3E") 4 4, auto`
})