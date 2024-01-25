import Swiper, { Autoplay, Navigation, Scrollbar } from "swiper";
import "swiper/swiper-bundle.min.css";

export const bigBannersSwiper = new Swiper(".big-banners__swiper", {
  slidesPerView: 1,
  centeredSlides: false,
  spaceBetween: 16,
  loop: true,
  navigation: {
    nextEl: ".big-banners__next-btn",
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  modules: [Autoplay, Navigation],
  breakpoints: {},
});

const swiperProductsSettings = {
  modules: [Autoplay, Navigation, Scrollbar],
  slidesPerView: "auto",
  centeredSlides: false,
  spaceBetween: 16,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {},
};

export const sharesSwiper = new Swiper(".shares__swiper", {
  navigation: {
    nextEl: ".shares__next-btn",
  },
  scrollbar: { el: ".shares__swiper-scrollbar", hide: false },
  ...swiperProductsSettings,
});

export const moreProductsSwiper = new Swiper(".more-products__swiper", {
  navigation: {
    nextEl: ".more-products__next-btn",
  },
  scrollbar: { el: ".more-products__swiper-scrollbar", hide: false },
  ...swiperProductsSettings,
});
