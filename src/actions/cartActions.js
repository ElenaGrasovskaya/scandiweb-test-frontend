import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_CHANGE_QTY } from "../constants/constants";
import { getState } from "react";

export const addToCart = (product, qty, selectedAttributes) => (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    product: {
      ...product,
      qty,
      selectedAttributes,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (name) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: name,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const changeItemQTY = (name, qty) => (dispatch, getState) => {
  dispatch({
    type: CART_CHANGE_QTY,
    payload: {itemName: name, newQty: qty},
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
