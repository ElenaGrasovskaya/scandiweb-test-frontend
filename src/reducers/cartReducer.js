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
            x.name !== existItem.name &&
            JSON.stringify(x.selectedAttributes) !==
              JSON.stringify(existItem.attributes)
              ? item
              : x
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
            { return JSON.stringify(x.selectedAttributes)+x.name!==
            JSON.stringify(action.payload.attributes)+action.payload.itemName }
        ),
      };

    case CART_CHANGE_QTY:
      const { itemName, newQty, attributes } = action.payload;

      const selectedProduct = state.cartItems.find(
        (x) =>
          x.name === itemName &&
          JSON.stringify(x.selectedAttributes) === JSON.stringify(attributes)
      );
      if (selectedProduct) {
        selectedProduct.qty = newQty;
      }

      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.name === selectedProduct.name &&
          JSON.stringify(x.selectedAttributes) ===
            JSON.stringify(selectedProduct.selectedAttributes)
            ? selectedProduct
            : x
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
