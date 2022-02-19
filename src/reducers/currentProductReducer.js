import { CURRENT_PRODUCT_SAVE } from "../constants/constants";

export const currentProductReducer = (state = {}, action) => {
  switch (action.type) {
      case CURRENT_PRODUCT_SAVE:
      return {
        ...state,
        currentProduct: {
         ...action.currentProduct
        }
      };

    default:
      return state;
  }
};
