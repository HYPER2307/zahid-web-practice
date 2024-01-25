import { instance } from "./instance";
import { accept_modal, bad_modal } from "../components/module/form_action";

export async function addToCart(item) {
  try {
    const { data } = await instance.post("/api/cart_items/", item);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function removeCartItem(id) {
  try {
    const { data } = await instance.delete(`/api/cart_item/${id}/`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCartItem(id, quantity) {
  try {
    const { data } = await instance.patch(`/api/cart_item/${id}/`, {
      quantity,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function sendOrder(formData) {
  try {
    document.querySelector(".modal_loading__block").classList.add("active");

    const { data } = await instance.post(`/api/order_items/`, formData);

    if (data?.url) {
      accept_modal();
      document.location.href = data.url;
    }

    return data;
  } catch (error) {
    console.log(error);
    bad_modal(error);
  }
}

export async function getSettlements(value) {
  try {
    const { data } = await instance.get(`/api/settlements/?q=${value}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getWarehouses(value) {
  try {
    const { data } = await instance.get(`/api/warehouses?q=${value}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
