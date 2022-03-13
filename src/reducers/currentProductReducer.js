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
      const newAttributeID = action.selectedAttributes.productId;

      const existItem = state.selectedAttributes.findIndex(
        (x) => x.productId === newAttributeID
      );

      if (existItem != -1) {
        return {
          ...state,
          selectedAttributes: state.selectedAttributes.map((item) => {
            if (item.productId === newAttributeID) {
              return action.selectedAttributes;
            } else return item;
          }),
        };
      } else {
        return {
          ...state,
          selectedAttributes: [
            ...state.selectedAttributes,
            action.selectedAttributes,
          ],
        };
      }

    default:
      return state;
  }
};
