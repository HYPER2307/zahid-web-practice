// import Swiper, {
//     Autoplay,
//     Navigation,
//     Pagination,
//     Scrollbar
// } from 'swiper';
// import 'swiper/swiper-bundle.css'
// import './index.scss'

// Swiper.use([Autoplay, Navigation, Pagination, Scrollbar])

// let swiper = new Swiper(".top_slider", {
//     slidesPerView: '1',
//     loop: true,
//     spaceBetween: 30,

//     navigation: {
//         nextEl: ".top-slider-btn-next",
//         prevEl: ".top-slider-btn-prev",
//     },

//     pagination: {
//         el: ".top_slider-pagination",
//         type: "fraction",
//         renderFraction: function (currentClass, totalClass) {
//             return `<div class="pagination_wrapper"> 
//                 <span class="currentZero">0</span><span class="${currentClass}"></span> 
//                 <span class="totalZero">/0</span><span class="${totalClass}"></span> 
//             </div>`
//         }
//     },
// })

// let products_swiper = new Swiper(".product__slider", {
//     slidesPerView: '3',
//     loop: true,
//     spaceBetween: 30,

//     navigation: {
//         nextEl: ".product-slider-btn-next",
//         prevEl: ".product-slider-btn-prev",
//     },

//     // pagination: {
//     //     el: ".swiper-pagination",
//     //     type: "fraction",
//     // }
// })

// let advances_swiper = new Swiper(".advances__items", {
//     slidesPerView: '9',
//     spaceBetween: 30,

//     pagination: {
//         el: ".advances-pagination",
//         type: "progressbar",
//     }
// })