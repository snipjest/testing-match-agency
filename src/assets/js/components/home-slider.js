new Swiper('#homeSlider', {
  spaceBetween: 20,
  loop: true,
  slidesPerView: 1,
  autoplay: {
    delay: 4000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
})