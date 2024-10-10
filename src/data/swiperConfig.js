export const swiperNewsConfig = {
  slidesPerView: "auto",
  speed: 800,
  spaceBetween: 24,
  loop: true,
  roundLengths: true,
  autoplay: {
    delay: 2000,
  },
  navigation: {
    nextEl: ".winner-next",
    prevEl: ".winner-prev",
  },

  breakpoints: {
    320: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 5,
    },
    1400: {
      slidesPerView: 5,
    },
    1600: {
      slidesPerView: 5,
    },
  },
};
