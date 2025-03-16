const cardSliders = document.querySelectorAll('.card__slider .swiper')

cardSliders.forEach((slider) => {
  const swiper = new Swiper(slider, {
    spaceBetween: 20,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        speed: 0,
      },
    },
  })

  // Добавление элементов слайдера при наведении мыши на desktop
  const firstSlide = slider.querySelector('a.swiper-slide')
  const firstHref = firstSlide ? firstSlide.getAttribute('href') : '#'
  const controlsContainer = document.createElement('div')
  controlsContainer.classList.add('card__slider-controls')
  for (let i = 0; i < swiper.slides.length; i++) {
    const controlItem = document.createElement('a')
    controlItem.classList.add('card__slider-controls-item')
    if (firstHref) {
      controlItem.setAttribute('href', firstHref)
    }
    controlItem.addEventListener('mouseover', () => {
      swiper.slideTo(i)
    })
    controlsContainer.appendChild(controlItem)
  }
  controlsContainer.addEventListener('mouseleave', () => {
    swiper.slideTo(0)
  })
  slider.parentNode.insertBefore(controlsContainer, slider.nextSibling)
})
