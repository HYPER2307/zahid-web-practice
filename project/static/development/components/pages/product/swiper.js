// import "./index.scss";

import Swiper, { Thumbs, Navigation } from "swiper";
// import "swiper/swiper-bundle.css";

Swiper.use([Thumbs, Navigation]);

const product_main_swiper = new Swiper(".product_main-swiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  initialSlide: 0,
  // zoom: {
  //     maxRaito: 5,
  //     minRaito: 1
  // },

  thumbs: {
    swiper: {
      el: ".product_main-swiper-mini",
      navigation: {
        nextEl: ".product_main-swiper-mini__next-btn",
        prevEl: ".product_main-swiper-mini__prev-btn",
      },
      slidesPerView: 4,
      spaceBetween: 14,
      modules: { Navigation },
      breakpoints: {
        700: {
          slidesPerView: 4,
        },
        600: {
          slidesPerView: 3,
        },
        300: {
          slidesPerView: 2,
        },
      },
    },
  },
});

const colorsSwiper = new Swiper(".colors-swiper", {
  slidesPerView: "auto",
  spaceBetween: 10,
});
