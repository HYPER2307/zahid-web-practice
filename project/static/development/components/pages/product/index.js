import "./swiper";

import "./index.scss";
import "./colors-checkbox.scss";

import { updateCartLabel } from "../../common_componentc/header/cart";
import { addToCart } from "../../../api/cart";

const submitButton = document.querySelector('.product__buy-btn');
const productId = submitButton.dataset.productId;
const colorsRadioButtons = document.querySelectorAll('.radio');
const itemsCount = document.querySelector('.product__buy-btn-count');
let selectedColor = colorsRadioButtons[0].value;

colorsRadioButtons.forEach(el => {
  el.addEventListener('input', () => {
    selectedColor = el.value;
  });
});

submitButton.addEventListener('click', () => {
  const item = {
    item_id: productId,
    item_color: selectedColor,
  };

  addToCart(item).then((data) => {
    updateCartLabel(data);

    itemsCount.innerText = data.cart_items_quantity;
  });
});
