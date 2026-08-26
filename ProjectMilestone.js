// Nav Button Toggle
const navContainer = document.querySelector('nav')
const navList = document.querySelector('nav ul')

if (navContainer && navList) {
  const menuBtn = document.createElement('button')
  menuBtn.textContent = 'Toggle Menu'
  menuBtn.classList.add('btn')
  
  menuBtn.setAttribute('aria-expanded', 'false')
  menuBtn.setAttribute('aria-controls', 'main-nav')
  navList.id = 'main-nav'

  if (window.innerWidth < 768) {
    navList.style.display = 'none'
  }

  menuBtn.addEventListener('click', () => {
    const isHidden = navList.style.display === 'none'
    navList.style.display = isHidden ? 'flex' : 'none'
    menuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false')
  })

  navContainer.parentNode.insertBefore(menuBtn, navContainer)
}

// Forms 
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

    const emailInput = document.getElementById('userEmail')
    const emailError = document.getElementById('emailError')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test("user@example.com");
    
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.style.display = 'block'
      emailInput.setAttribute('aria-invalid', 'true')
      isFormValid = false
    } else {
      emailError.style.display = 'none'
      emailInput.setAttribute('aria-invalid', 'false')
    }

    if (!isFormValid) {
      event.preventDefault()
    }
  })
}

// Random Fact Home
const homeMain = document.querySelector('main section:first-of-type')

if (homeMain && document.title.includes('Home')) {
  const apiArticle = document.createElement('article')
  const apiTitle = document.createElement('h3')
  const apiContent = document.createElement('p')

  apiTitle.textContent = 'Did You Know?'
  apiContent.textContent = 'Loading a random fact...'
  apiContent.setAttribute('aria-live', 'polite')

  apiArticle.appendChild(apiTitle)
  apiArticle.appendChild(apiContent)
  homeMain.appendChild(apiArticle)

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