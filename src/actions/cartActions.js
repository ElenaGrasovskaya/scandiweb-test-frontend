import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/constants";
import { getState } from "react";

export const addToCart = (id, qty, product) => async (dispatch, getState) => {
  
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
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

