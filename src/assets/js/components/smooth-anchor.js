document.querySelectorAll('a.link-anchor[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const targetId = this.getAttribute('href')
    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const offset = 50
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      })
    }
  })
})