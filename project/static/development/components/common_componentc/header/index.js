import "./search";
import "./authorization";
import "./quickly-shop";
import "./cart";
import "./favorites";
import "./index.scss";
import "./search.scss";
import "./authorization.scss";
import "./quickly-shop.scss";
import "../../interface/categories/index";
import "../../module/custom_select/index";
import "../../module/menu/index";
import { customSelectFunc } from "../../module/custom_select/index";

customSelectFunc(".select-categories");

const burgerBtn = document.querySelector(".burger-btn");
const menu = document.querySelector(".main-menu");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("active");
  menu.classList.toggle("active");
});

const categoryBurgerBtn = document.querySelector(".category-burger-btn");
const categoryMenu = document.querySelector(".menu");

if (categoryBurgerBtn) {
  categoryBurgerBtn.addEventListener("click", () => {
    categoryBurgerBtn.classList.toggle("active");
    categoryMenu.classList.toggle("active");
  });
}

const header = document.querySelector("header");
const search = header.querySelector(".header__search");

header.addEventListener("click", ({ target }) => {
  if (target.closest(".close-menu-btn")) {
    categoryBurgerBtn.classList.remove("active");
    categoryMenu.classList.remove("active");
  }

  //open and close search
  if (target.closest(".open-search-btn")) {
    search.classList.add("active");
  }

  if (target.closest(".close-search-btn")) {
    search.classList.remove("active");
  }
});
