// Проверяем поддерживает ли устройство Retina
const isRetina = window.devicePixelRatio > 1
if (isRetina) {
  const galleryLinks = document.querySelectorAll('.gallery a.swiper-slide')
  galleryLinks.forEach((link) => {
    const retinaImage = link.getAttribute('data-at-2x')
    if (retinaImage) {
      link.setAttribute('href', retinaImage)
    }
  })
}
// Инициализация галереи
baguetteBox.run('.gallery')
