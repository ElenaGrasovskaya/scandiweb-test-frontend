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
      const existItem = state.cartItems.find(
        (x) =>
          x.name === item.name &&
          JSON.stringify(x.selectedAttributes) ===
            JSON.stringify(item.selectedAttributes)
      );


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
          cartItems: [...state.cartItems, action.product],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) =>
            x.name !== action.payload.name &&
            JSON.stringify(x.selectedAttributes) !==
              JSON.stringify(action.payload.attributes)
        ),
      };

    case CART_CHANGE_QTY:
      const {itemName, newQty, attributes}=action.payload;

  
      const selectedProduct = state.cartItems.find(
        (x) =>
          x.name === itemName &&
          JSON.stringify(x.selectedAttributes) ===
            JSON.stringify(attributes)
      );
      selectedProduct.qty = newQty;


      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          ( x.name === selectedProduct.name &&
            JSON.stringify(x.selectedAttributes) ===
              JSON.stringify(selectedProduct.selectedAttributes)) ? selectedProduct : x
        ),
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
