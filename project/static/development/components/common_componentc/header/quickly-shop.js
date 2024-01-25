import { validationBtn } from "../../module/validation";

validationBtn(".quickly-shop__form");

const quicklyShopForm = document.querySelector(".quickly-shop__form");

document.addEventListener("click", ({ target }) => {
  if (target.closest(".product__buy-btn")) {
    const productItem = target.closest(".product");

    quicklyShopForm.dataset.id = productItem?.dataset.productId;
  }
});
