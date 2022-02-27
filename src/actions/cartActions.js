import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/constants";
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

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
