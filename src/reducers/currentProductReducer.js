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
          productId: action.productId,
          attributes: action.attributes,
        },
      };

    default:
      return state;
  }
};
