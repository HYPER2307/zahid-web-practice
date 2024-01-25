import "./index.scss";

let all_modals = document.querySelectorAll(".modal__block");
let modal_close = document.querySelectorAll(".modal_close");
const help = document.querySelector(".help");

let modal_open = document.querySelectorAll(".modal_open");

modal_open.forEach((element) => {
  let modal_block = document.querySelector(`.${element.dataset.href}`);
  element.addEventListener("click", function () {
    // top_swiper.autoplay.stop();
    all_modals.forEach((modal) => {
      const overlay = modal.closest(".overlay");

      modal.classList.remove("active");

      if (overlay) {
        overlay.classList.remove("active");
      }
    });
    const overlay_block = modal_block.closest(".overlay");

    modal_block.classList.add("active");

    if (overlay_block) {
      overlay_block.classList.add("active");
    }

    if (help) {
      help.classList.add("active");
    }

    if (modal_block.classList.contains("quckly_shop")) {
      modal_block.querySelector(".quckly_shop_form").dataset.id =
        element.dataset.id;
    }
  });
});

all_modals.forEach((element) => {
  document.body.addEventListener("click", (e) => {
    // при клике в любом месте окна браузера
    const target = e.target; // находим элемент, на котором был клик
    let check = element.classList.contains("active");

    if (
      !target.closest(".modal__block") &&
      !target.closest(".modal_open") &&
      check
    ) {
      const overlay = element.closest(".overlay");
      const isNotCloseOutside = overlay.dataset?.isNotCloseOutside;
      // если этот элемент или его родительские элементы не окно навигации и не кнопка
      // то закрываем окно навигации, удаляя активный класс

      if (!isNotCloseOutside) {
        element.classList.remove("active");
      }

      if (overlay && !isNotCloseOutside) {
        overlay.classList.remove("active");
      }

      if (help) {
        help.classList.remove("active");
      }
      // top_swiper.autoplay.start();

      if (check && element.classList.contains("quckly_shop_form")) {
        document.querySelector(".quckly_shop_form").dataset.count = null;
        document.querySelector(".quckly_shop_form").dataset.id = null;
      }
    }
  });
});

modal_close.forEach((element) => {
  let wrapper = element.closest(".modal__block");
  element.addEventListener("click", function () {
    const overlay = wrapper.closest(".overlay");

    wrapper.classList.remove("active");

    if (overlay) {
      overlay.classList.remove("active");
    }

    if (help) {
      help.classList.remove("active");
    }
    // top_swiper.autoplay.start();

    if (wrapper.classList.contains("quckly_shop_form")) {
      document.querySelector(".quckly_shop_form").dataset.count = null;
      document.querySelector(".quckly_shop_form").dataset.id = null;
    }
  });
});
