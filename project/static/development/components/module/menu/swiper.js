import Swiper, { Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

export const menuSwiper = new Swiper(".menu-swiper", {
  modules: [Autoplay],
  slidesPerView: "auto",
  centeredSlides: false,
  spaceBetween: 24,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  breakpoints: {},
});
