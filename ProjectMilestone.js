// Part 1
const navContainer = document.querySelector('nav')
const navList = document.querySelector('nav ul')

if (navContainer && navList) {
const menuBtn = document.createElement('button')
menuBtn.textContent = 'Menu'
menuBtn.classList.add('btn')

menuBtn.setAttribute('aria-expanded', 'false')
menuBtn.setAttribute('aria-controls', 'main-nav')
navList.id = 'main-nav'

// stay closed
navList.style.display = 'none'

menuBtn.addEventListener('click', () => {
const isHidden = navList.style.display === 'none'
navList.style.display = isHidden ? 'flex' : 'none'
menuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false')
})

navContainer.parentNode.insertBefore(menuBtn, navContainer)
}

// Part 2
const footerContainer = document.querySelector('footer')

if (footerContainer && document.title.includes('Home')) {
  const apiSection = document.createElement('section')
  apiSection.classList.add('center-and-border')
  
  const sectionTitle = document.createElement('h2')
  sectionTitle.textContent = 'Random Fact Section'
  
  const apiTitle = document.createElement('h3')
  apiTitle.textContent = 'Did You Know?'
  
  const apiContent = document.createElement('p')
  apiContent.textContent = 'Loading a random fact...'
  apiContent.setAttribute('aria-live', 'polite')

  apiSection.appendChild(sectionTitle)
  apiSection.appendChild(apiTitle)
  apiSection.appendChild(apiContent)
  
  footerContainer.parentNode.insertBefore(apiSection, footerContainer)

  fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
    .then(response => response.json())
    .then(data => {
      apiContent.textContent = data.text
    })
    .catch(error => {
      apiContent.textContent = 'Could not load a fact at this time.'
      console.error('API Error:', error)
    })
}

// Part 3
const contactForm = document.querySelector('form')

if (contactForm) {
contactForm.addEventListener('submit', (event) => {
let isFormValid = true

const nameInput = document.getElementById('userName')
const nameError = document.getElementById('nameError')

if (nameInput.value.trim() === '') {
nameError.style.display = 'block'
nameInput.setAttribute('aria-invalid', 'true')
isFormValid = false
} else {
nameError.style.display = 'none'
nameInput.setAttribute('aria-invalid', 'false')
}

const foodInput = document.getElementById('userFood')
const foodError = document.getElementById('foodError')

if (foodInput.value.trim() === '') {
foodError.style.display = 'block'
foodInput.setAttribute('aria-invalid', 'true')
isFormValid = false
} else {
foodError.style.display = 'none'
foodInput.setAttribute('aria-invalid', 'false')
}

const emailInput = document.getElementById('userEmail')
const emailError = document.getElementById('emailError')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(emailInput.value.trim())) {
emailError.style.display = 'block'
emailInput.setAttribute('aria-invalid', 'true')
isFormValid = false
} else {
emailError.style.display = 'none'
emailInput.setAttribute('aria-invalid', 'false')
}

const messageInput = document.getElementById('userMessage')
const messageError = document.getElementById('messageError')

if (messageInput.value.trim() === '') {
messageError.style.display = 'block'
messageInput.setAttribute('aria-invalid', 'true')
isFormValid = false
} else {
messageError.style.display = 'none'
messageInput.setAttribute('aria-invalid', 'false')
}

if (!isFormValid) {
event.preventDefault()
}
})
}
//don't know why I need this//
//look into it//