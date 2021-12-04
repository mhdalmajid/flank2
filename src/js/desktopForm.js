// DOM Elements
const desktopForm = document.querySelector('#mc-embedded-subscribe-form-desktop')
const nameInput = document.querySelector('#desktop-name')
const emailInput = document.querySelector('#desktop-email')
const nameButton = document.querySelector('#next-input')
const submitButton = document.querySelector('#mc-embedded-subscribe-form-desktop button[type=submit]')

// Regex
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ']+[A-Za-zÀ-ÖØ-öø-ÿ '\-.,]*[A-Za-zÀ-ÖØ-öø-ÿ.]+$/
// eslint-disable-next-line no-control-regex
const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

const isValid = (input, regex) => {
  return regex.test(input.value)
}

const swapToEmail = () => {
  nameInput.classList.add('hidden')
  nameButton.classList.add('hidden')
  emailInput.classList.remove('hidden')
  submitButton.classList.remove('hidden')
}

const nextInput = () => {
  if (isValid(nameInput, nameRegex)) swapToEmail()
}

const handleSubmit = (e) => {
  if (!isValid(emailInput, emailRegex)) e.preventPrefault()
}

nameButton.addEventListener('click', nextInput)
desktopForm.addEventListener('submit', handleSubmit)
