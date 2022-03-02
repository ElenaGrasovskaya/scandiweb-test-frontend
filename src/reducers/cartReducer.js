import { bindActionCreators } from "redux";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_CHANGE_QTY,
} from "../constants/constants";

export const cartReducer = (
    state = { cart: {cartItems: []}},
    action
  ) => {
    switch (action.type) {
      case CART_ADD_ITEM:
        const item = action.product;
        const existItem = state.cartItems.find((x) => x.name === item.name);
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.product === existItem.product ? item : x
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

        case  CART_CHANGE_QTY:
          const selectedProduct = state.cartItems.filter((x) => x.name === action.payload.itemName);
          return {
            ...state,
            cartItems: [{...selectedProduct[0], qty :action.payload.newQty}, ...state.cartItems.filter((x) => x.name !== action.payload.itemName)],
          };
  
     
      case CART_CLEAR_ITEMS:
        return {
          ...state,
          cartItems: []
        }
  
      default:
        return state;
    }
  };