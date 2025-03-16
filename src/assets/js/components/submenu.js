// === Подменю на desktop/mobile ===
const submenu = document.querySelector('.nav__submenu')
const submenuList = submenu.querySelector('.nav__submenu-list')
const submenuBtn = document.querySelector('.nav__submenu-btn')

// Плавное открытие/закрытие подменю на mobile
function handleClick() {
  if (submenu.classList.contains('open')) {
    submenuList.style.maxHeight = submenuList.scrollHeight + 'px'
    setTimeout(() => {
      submenuList.style.maxHeight = '0'
    }, 10)
    submenuList.addEventListener(
      'transitionend',
      () => {
        submenu.classList.remove('open')
      },
      { once: true }
    )
  } else {
    submenuList.style.maxHeight = submenuList.scrollHeight + 'px'
    submenu.classList.add('open')
  }
}

// Hover подменю на desktop
function handleMouseEnter() {
  submenu.classList.add('open')
  submenuList.style.maxHeight = submenuList.scrollHeight + 'px'
}
function handleMouseLeave() {
  submenu.classList.remove('open')
  submenuList.style.maxHeight = '0'
}

// Инициализация
function initSubmenuHandlers() {
  if (!submenu || !submenuList || !submenuBtn) {
    return
  }
  // Удаляем старые обработчики
  submenuBtn.removeEventListener('click', handleClick)
  submenu.removeEventListener('mouseenter', handleMouseEnter)
  submenu.removeEventListener('mouseleave', handleMouseLeave)

  if (window.innerWidth <= 1279) {
    submenuBtn.addEventListener('click', handleClick)
  } else {
    submenu.addEventListener('mouseenter', handleMouseEnter)
    submenu.addEventListener('mouseleave', handleMouseLeave)
    submenuList.style.maxHeight = '0'
  }
}
initSubmenuHandlers()
window.addEventListener('resize', function () {
  initSubmenuHandlers()
})
