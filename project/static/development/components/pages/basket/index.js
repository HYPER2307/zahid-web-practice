import "./index.scss";
import {
  delete_item,
  input_basket,
  minus,
  plus,
} from "../../module/shop_scripts/basket_action";
import { customSelectFunc } from "../../module/custom_select";
import { updateCartLabel } from "../../common_componentc/header/cart";
import { checkFormErrors, validationBtn } from "../../module/validation";
import {
  removeCartItem,
  updateCartItem,
  sendOrder,
  getSettlements,
  getWarehouses,
} from "../../../api/cart";

const BASKET_NOTIFICATION_HTML = '<p class="basket__notification">Додайте хоча б 1 товар в корзину!</p>';

const CASHLESS_PAYMENT_LEGAL_ENTITY = 'cashless-payment-legal-entity';
const CASHLESS_PAYMENT_INDIVIDUAL = 'cashless-payment-individual';
const PARTIAL_PREPAYMENT = 'partial-prepayment';

const NP = 'np';
const COURIER = 'courier';
const SELF_PICKUP = 'self-pickup';

customSelectFunc(".select-settlement");
customSelectFunc(".select-warehouse");
validationBtn('.order_form');

const removeItem = target => {
  delete_item(target, '.product-column');
};

const plusItem = target => {
  return plus('.product-column', '.count_input', target);
};

const minusItem = target => {
  return minus('.product-column', '.count_input', target);
};

const setItemTotalSum = (target, newValue) => {
  const wrap = target.closest('.product-column');
  const totalSumElem = wrap.querySelector('.product-column__paid span');

  totalSumElem.innerText = !Number.isInteger(newValue) ? newValue : newValue.toFixed(1);
};

const productColumnHead = document.querySelector('.products-column__head');
const productItems = document.querySelectorAll('.product-column');
const productsList = document.querySelector('.products-column__items');

const getInputWrapper = input => {
  const inputWrapper = input.closest('.field');

  return inputWrapper;
};

const order = document.querySelector('.order_form');

const nameInput = order.querySelector('input#name');
const surnameInput = order.querySelector('input#surname');
const phoneInput = order.querySelector('input#tel');
const emailInput = order.querySelector('input#email');
const commentInput = order.querySelector('textarea#comment');
const loyaltyInput = order.querySelector('input#loyalty');

const addressInput = order.querySelector('input#address');
const addressWrapper = getInputWrapper(addressInput);

const warehouseInput = order.querySelector('input#warehouse');
const warehouseWrapper = getInputWrapper(warehouseInput);

const settlementInput = order.querySelector('input#settlement');
const settlementWrapper = getInputWrapper(settlementInput);

const entityInput = order.querySelector('input#entity');
const entityWrapper = getInputWrapper(entityInput);

const edrpouCodeInput = order.querySelector('input#edrpouCode');
const edrpouCodeWrapper = getInputWrapper(edrpouCodeInput);

const settlementSelectList = settlementWrapper.querySelector('.custom-select__list');
const warehouseSelectList = warehouseWrapper.querySelector('.custom-select__list');

const submitButton = order.querySelector('.contacts__form-send-btn');

let deliveryMethod = SELF_PICKUP;
let paymentMethod = PARTIAL_PREPAYMENT;

const resetSelectedDeliveryMethod = () => {
  addressWrapper.classList.remove('active');
  addressInput.classList.remove('validation_input');

  warehouseWrapper.classList.remove('active');
  warehouseInput.classList.remove('validation_input');

  settlementWrapper.classList.remove('active');
  settlementInput.classList.remove('validation_input');
}

const setSelectedDeliveryMethod = currentDeliveryMethod => {
  switch (currentDeliveryMethod) {
    case NP:
      resetSelectedDeliveryMethod();

      warehouseWrapper.classList.add('active');
      warehouseInput.classList.add('validation_input');

      settlementWrapper.classList.add('active');
      settlementInput.classList.add('validation_input');

      deliveryMethod = currentDeliveryMethod;

      break;

    case COURIER:
      resetSelectedDeliveryMethod();

      addressWrapper.classList.add('active');
      addressInput.classList.add('validation_input');

      deliveryMethod = currentDeliveryMethod;

      break;

    case SELF_PICKUP:
      resetSelectedDeliveryMethod();

      deliveryMethod = currentDeliveryMethod;

      break;
  }
}

const resetSelectedPaymentMethod = () => {
  entityWrapper.classList.remove('active');
  entityInput.classList.remove('validation_input');
  edrpouCodeWrapper.classList.remove('active');
  edrpouCodeInput.classList.remove('validation_input');
}

const setSelectedPaymentMethod = currentPaymentMethod => {
  switch (currentPaymentMethod) {
    case CASHLESS_PAYMENT_LEGAL_ENTITY:
      entityWrapper.classList.add('active');
      entityInput.classList.add('validation_input');
      edrpouCodeWrapper.classList.add('active');
      edrpouCodeInput.classList.add('validation_input');

      paymentMethod = currentPaymentMethod;

      break;
    
    case CASHLESS_PAYMENT_INDIVIDUAL: 
      resetSelectedPaymentMethod();

      paymentMethod = currentPaymentMethod;

      break;
    
    case PARTIAL_PREPAYMENT:
      resetSelectedPaymentMethod();

      paymentMethod = currentPaymentMethod;

      break;
  }
};

const renderHTMLList = (array) => {
  const preparedList = array.map(({ id, title }) => {
    return `<li id="${id}" class="custom-select__list-item">${title}</li>`
  });

  return preparedList.join('');
};

function resetWarehouseExtraSymbols(inputValue) {
  const cleanedValue = inputValue.toLowerCase()
      .replace('до', '')
      .replace('вул', '')
      .replace(/[^a-zA-Z0-9а-яА-яі]/g, '');

  return cleanedValue;
}

if (!productItems.length) {
  productColumnHead.remove();

  productsList.innerHTML = BASKET_NOTIFICATION_HTML;

  submitButton.disabled = true;
}

document.addEventListener("click", async ({ target }) => {
  checkFormErrors(order, submitButton);

  if (submitButton.disabled) {
    return;
  }

  const deleteButton = target.closest(".btn_delete");

  const countPlus = target.closest('.count_plus');
  const countMinus = target.closest('.count_minus');

  const cartItem = target.closest(".product-column");
  const cartItemId = cartItem?.dataset.cartItemId;

  const totalAmount = cartItem?.dataset.item_amount;

  const settlementId = settlementInput.dataset.listItemId;
  const listItem = target.closest('.custom-select__list-item');
  const settlementSelectItem = listItem?.closest('.select-settlement');

  const isSubmitButton = target.closest('.contacts__form-send-btn');

  if (deleteButton) {
    const data = await removeCartItem(cartItemId);

    removeItem(target);

    if (!data.cart_items_quantity) {
      productColumnHead.remove();

      productsList.innerHTML = BASKET_NOTIFICATION_HTML;
    }
  }

  if (countPlus) {
    const value = plusItem(target)

    if (value <= totalAmount) {
      const data = await updateCartItem(cartItemId, value);
      const { cart_item_total_price } = data;

      updateCartLabel(data);
      setItemTotalSum(target, cart_item_total_price);
    }
  }

  if (countMinus) {
    const value = minusItem(target);
    const data = await updateCartItem(cartItemId, value);


    updateCartLabel(data);
    setItemTotalSum(target, data.cart_item_total_price);
  }

  if (settlementSelectItem) {
    const data = await getWarehouses(settlementId);

    warehouseSelectList.innerHTML = renderHTMLList(data).join('');
  }

  if (isSubmitButton) {
    const formState = {
      name: nameInput.value,
      surname: surnameInput.value,
      phone: phoneInput.value,
      email: emailInput.value,
      settlement: settlementInput.dataset.listItemId,
      warehouse: warehouseInput.dataset.listItemId,
      address: addressInput.value,
      comments: commentInput.value,
      loyality_system: loyaltyInput.value,
      delivery_opt: deliveryMethod,
      payment_opt: paymentMethod,
      entity: entityInput.value,
      edrpou: edrpouCodeInput.value
    };

    sendOrder(formState);
  }
});

document.addEventListener('input', async ({ target }) => {
  const cartItem = target.closest('.product-column');
  const cartItemId = cartItem?.dataset.cartItemId;
  const inputBasket = target.closest('.count_input');
  const totalAmount = cartItem?.dataset.item_amount;

  const isSettlementInput = target.closest('input#settlement');
  const isWarehouseInput = target.closest('input#warehouse');
  const isNameInput = target.closest('input#name');
  const isSurnameInput = target.closest('input#surname');

  if (inputBasket) {
    const value = input_basket(inputBasket);

    if (value >= totalAmount) {
      const data = await updateCartItem(cartItemId, totalAmount);

      updateCartLabel(data);

      inputBasket.value = totalAmount;

      setItemTotalSum(target, data.cart_item_total_price);
    }

    if (value <= totalAmount) {
      const data = await updateCartItem(cartItemId, value);

      updateCartLabel(data);

      inputBasket.value = value;
      setItemTotalSum(target, data.cart_item_total_price);
    }
  }

  if (target.type === 'radio') {
    setSelectedDeliveryMethod(target.value);
    setSelectedPaymentMethod(target.value);
  }

  if (isNameInput) {
    nameInput.value = nameInput.value.replace(/[^a-zA-Zа-яА-яі ]/g, '').trimStart();
  }

  if (isSurnameInput) {
    surnameInput.value = surnameInput.value.replace(/[^a-zA-Zа-яА-яі ]/g, '').trimStart();
  }

  if (isSettlementInput) {
    const settlementValue = settlementInput.value.charAt(0).toUpperCase() + settlementInput.value.slice(1);

    const { results } = await getSettlements(settlementValue);

    settlementSelectList.innerHTML = renderHTMLList(results);
  }

  if (isWarehouseInput) {
    const settlementId = settlementInput.dataset.listItemId;

    if (settlementId) {
      const data = await getWarehouses(settlementId);

      const warehouseValue = resetWarehouseExtraSymbols(warehouseInput.value);
  
      const filteredWarehouseList = data
        .filter(({ title }) => resetWarehouseExtraSymbols(title).includes(warehouseValue));
  
      warehouseSelectList.innerHTML = renderHTMLList(filteredWarehouseList);
    }
  }
});