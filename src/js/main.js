const flankText = document.querySelector('.header_flank-small')
const flankTextBig = document.querySelector('.about_flank-small')
const headerSection = document.querySelector('.header')
const aboutSection = document.querySelector('.about')
const presentation = document.querySelector('.presentation')
const contact = document.querySelector('.contact')
const pTagsInpresentation = document.querySelectorAll('.presentation_container > p')
const pTagsInpresentationLength = pTagsInpresentation.length
const sections = [presentation, contact]
let PHeight = screen.height
const TotalLayers = sections.length

// setting fixed position for sections
// when the top of section reaches (top 0)
let whichLayer = 0
function setFixedPosition(e) {
  let scrollPosition = window.pageYOffset

  if (whichLayer >= TotalLayers) return
  if (scrollPosition >= PHeight) {
    PHeight *= 2
    sections[whichLayer].style.position = 'sticky'
    sections[whichLayer].style.top = 0
    whichLayer++
  }
}

document.addEventListener('scroll', setFixedPosition, { passive: true })

// show .about section when click and hold flank text (mousedown,touchstart)
function showPage(e) {
  headerSection.classList.add('hidden')
  flankTextBig.classList.add('about_flank-big-to-small-animation')
}

// hide .about section when releasing flank text  (touchend,mouseup)
function up(e) {
  headerSection.classList.remove('hidden')
  flankTextBig.classList.remove('about_flank-big-to-small-animation')
}
flankText.addEventListener('mousedown', showPage)
flankText.addEventListener('touchstart', showPage)

flankText.addEventListener('touchend', up)
flankText.addEventListener('mouseup', up)
let count = 0
function showPTagOnclick(e) {
  count += 1
  if (count >= pTagsInpresentationLength) return
  if (count === pTagsInpresentationLength - 1) document.querySelector('.presentation_arrow').classList.remove('hidden')
  if (count === 1) {
    let firstPImages = pTagsInpresentation[count - 1].querySelectorAll('img')
    firstPImages[0].classList.add('hidden')
    firstPImages[1].classList.add('hidden')
  }
  pTagsInpresentation[count].classList.remove('hidden')
  pTagsInpresentation[count - 1].querySelector('img').classList.add('hidden')
}

presentation.addEventListener('click', showPTagOnclick)
