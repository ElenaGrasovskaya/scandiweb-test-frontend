import {
  CURRENT_PRODUCT_SAVE,
  CURRENT_PRODUCT_ATTRIBUTES,
} from "../constants/constants";

export const currentProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_PRODUCT_SAVE:
      return {
        ...state,
        currentProduct: {
          ...action.currentProduct,
        },
      };

    case CURRENT_PRODUCT_ATTRIBUTES:
      return {
        ...state,
        selectedAttributes: {
          attributes:[...state.selectedAttributes.attributes, action.selectedAttributes.attributes],
          productId: action.productId,
        },
      };

    default:
      return state;
  }
};
