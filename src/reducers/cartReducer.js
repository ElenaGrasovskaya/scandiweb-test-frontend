import { bindActionCreators } from "redux";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_CHANGE_QTY,
} from "../constants/constants";

export const cartReducer = (state = { cart: { cartItems: [] } }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.product;
      const existItem = state.cartItems.find((x) => x.name === item.name);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.name === existItem.name ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.name !== action.payload),
      };

    case CART_CHANGE_QTY:
      const selectedProducts = state.cartItems.map((x) => {
        if (x.name === action.payload.itemName)
          return { ...x, qty: action.payload.newQty };
        else return { ...x };
      });
      return {
        ...state,
        cartItems: [...selectedProducts],
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
