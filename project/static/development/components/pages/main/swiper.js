import Swiper, { Autoplay, Navigation, Scrollbar } from "swiper";
import "swiper/swiper-bundle.min.css";

const swiperProductsSettings = {
  modules: [Autoplay, Navigation, Scrollbar],
  slidesPerView: 2,
  spaceBetween: 0,
  centeredSlides: false,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {
    721: {
      slidesPerView: "auto",
      spaceBetween: 16,
    },
  },
};

export const noveltiesSwiper = new Swiper(".novelties__swiper", {
  navigation: {
    nextEl: ".novelties__swiper-next-btn",
  },
  scrollbar: { el: ".novelties__swiper-scrollbar", hide: false },
  ...swiperProductsSettings,
});

export const sharesSwiper = new Swiper(".shares__swiper", {
  navigation: {
    nextEl: ".shares__swiper-next-btn",
  },
  scrollbar: { el: ".shares__swiper-scrollbar", hide: false },
  ...swiperProductsSettings,
});
