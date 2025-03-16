function burgerMenu() {
  const burger = document.querySelector('.burger')
  const nav = document.querySelector('.nav')
  if (burger) {
    if (window.innerWidth <= 1279) {
      burger.addEventListener('click', function () {
        this.classList.toggle('active')
        document.documentElement.classList.toggle('lock')
        nav.classList.toggle('active')
      })
    } else {
      document.documentElement.classList.remove('lock')
      burger.classList.remove('active')
      nav.classList.remove('active')
    }
  }
}
burgerMenu()
window.addEventListener('resize', function () {
  burgerMenu()
})
