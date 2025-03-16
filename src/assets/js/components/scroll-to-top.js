const scrollBtn = document.querySelector('.scroll-top')
if (scrollBtn) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      scrollBtn.classList.add('active')
    } else {
      scrollBtn.classList.remove('active')
    }
  })
  scrollBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}