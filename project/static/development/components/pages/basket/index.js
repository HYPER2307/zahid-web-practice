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
const CASHLESS_PAYMENT_INDIDVIDUAL = 'cashless-payment-individual';
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
  const totalSumElem = wrap.querySelector('.product-column__paid').querySelector('span');

  totalSumElem.innerText = !Number.isInteger(newValue) ? newValue : `${newValue},0`;
};

const productColumnHead = document.querySelector('.products-column__head');
const productItems = document.querySelectorAll('.product-column');
const productsList = document.querySelector('.products-column__items');

const getInputWrapper = (input) => {
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
const warehousSelectList = warehouseWrapper.querySelector('.custom-select__list');

const formButton = order.querySelector('.contacts__form-send-btn');

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

function setSelectedDeliveryMethod(value) {
  switch (value) {
    case NP:
      resetSelectedDeliveryMethod();

      warehouseWrapper.classList.add('active');
      warehouseInput.classList.add('validation_input');

      settlementWrapper.classList.add('active');
      settlementInput.classList.add('validation_input');

      deliveryMethod = NP;

      break;

    case COURIER:
      resetSelectedDeliveryMethod();

      addressWrapper.classList.add('active');
      addressInput.classList.add('validation_input');

      deliveryMethod = COURIER;

      break;

    case SELF_PICKUP:
      resetSelectedDeliveryMethod();

      deliveryMethod = SELF_PICKUP;

      break;
  }
}

const resetSelectedPaymentMethod = () => {
  entityWrapper.classList.remove('active');
  entityInput.classList.remove('validation_input');
  edrpouCodeWrapper.classList.remove('active');
  edrpouCodeInput.classList.remove('validation_input');
}

const setSelectedPaymentMathod = (paymentMethod) => {
  switch (paymentMethod) {
    case CASHLESS_PAYMENT_LEGAL_ENTITY:
      entityWrapper.classList.add('active');
      entityInput.classList.add('validation_input');
      edrpouCodeWrapper.classList.add('active');
      edrpouCodeInput.classList.add('validation_input');

      paymentMethod = CASHLESS_PAYMENT_LEGAL_ENTITY;

      break;
    
    case CASHLESS_PAYMENT_INDIDVIDUAL: 
      resetSelectedPaymentMethod();

      paymentMethod = CASHLESS_PAYMENT_INDIDVIDUAL;

      break;
    
    case PARTIAL_PREPAYMENT:
      resetSelectedPaymentMethod();

      paymentMethod = PARTIAL_PREPAYMENT;

      break;
  }
};

const arrayToHTMLItemsList = (array) => {
  const preparedList = array.map(({ id, title }) => {
    return `<li id="${id}" class="custom-select__list-item">${title}</li>`
  });

  return preparedList;
};

function cleanWarehouseValue(inputValue) {
  const cleanedValue = inputValue.toLowerCase()
      .replace('до', '')
      .replace('вул', '')
      .replace(/[^a-zA-Z0-9а-яА-яі]/g, '');

  return cleanedValue;
}

if (!productItems.length) {
  productColumnHead.remove();

  productsList.innerHTML = BASKET_NOTIFICATION_HTML;

  formButton.disabled = true;
}

document.addEventListener("click", async ({ target }) => {
  const deleteButton = target.closest(".btn_delete");

  const countPlus = target.closest('.count_plus');
  const countMinus = target.closest('.count_minus');

  const cartItem = target.closest(".product-column");
  const cartItemId = cartItem?.dataset.cartItemId;

  const totalAmout = cartItem?.dataset.item_amount;

  const settlementId = settlementInput.dataset.listItemId;
  const listItem = target.closest('.custom-select__list-item');
  const settlementSelectItem = listItem?.closest('.select-settlement');

  const isFormButton = target.closest('.contacts__form-send-btn');

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

    if (value <= totalAmout) {
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

    warehousSelectList.innerHTML = arrayToHTMLItemsList(data).join('');
  }

  if (isFormButton) {
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
  const totalAmout = cartItem?.dataset.item_amount;

  const isSettlementInput = target.closest('input#settlement');
  const isWarehouseInput = target.closest('input#warehouse');

  if (inputBasket) {
    const value = input_basket(inputBasket);

    if (value >= totalAmout) {
      const data = await updateCartItem(cartItemId, totalAmout);

      updateCartLabel(data);

      inputBasket.value = totalAmout;

      setItemTotalSum(target, data.cart_item_total_price);
    }

    if (value <= totalAmout) {
      const data = await updateCartItem(cartItemId, value);

      updateCartLabel(data);

      inputBasket.value = value;
      setItemTotalSum(target, data.cart_item_total_price);
    }
  }

  if (target.type === 'radio') {
    setSelectedDeliveryMethod(target.value);
    setSelectedPaymentMathod(target.value);
  }

  if (isSettlementInput) {
    const settlementValue = settlementInput.value.charAt(0).toUpperCase() + settlementInput.value.slice(1);

    const { results } = await getSettlements(settlementValue);

    settlementSelectList.innerHTML = arrayToHTMLItemsList(results).join('');
  }

  if (isWarehouseInput) {
    const settlementId = settlementInput.dataset.listItemId;

    if (settlementId) {
      const data = await getWarehouses(settlementId);

      const warehouseValue = cleanWarehouseValue(warehouseInput.value);
  
      const preparedWarehouslist = data
        .filter(({ title }) => cleanWarehouseValue(title).includes(warehouseValue));
  
      warehousSelectList.innerHTML = arrayToHTMLItemsList(preparedWarehouslist).join('');
    }
  }
});