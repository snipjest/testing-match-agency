const productSliderThumbs = new Swiper('.about__slider-thumbs', {
  spaceBetween: 10,
  slidesPerView: 8,
})
new Swiper('.about__slider-main', {
  spaceBetween: 20,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-btn-next',
    prevEl: '.swiper-btn-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  thumbs: {
    swiper: productSliderThumbs,
  },
})