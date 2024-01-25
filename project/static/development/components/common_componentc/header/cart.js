// оновлення корзини в хедері
export const updateCartLabel = (data) => {
  const {
    cart_items_quantity,
    cart_total_price_with_discount,
    cart_total_price,
  } = data || {};

  const headerCartTotalCount = document.querySelector(".header__cart-quantity");
  const headerCartTotalPrice = document.querySelector(
    ".header__cart-cost span"
  );

  if (cart_items_quantity) {
    headerCartTotalCount.textContent = cart_items_quantity;
    headerCartTotalPrice.textContent = `${
      cart_total_price_with_discount || cart_total_price
    } ₴`;
  } else {
    headerCartTotalCount.textContent = "";
  }
};
