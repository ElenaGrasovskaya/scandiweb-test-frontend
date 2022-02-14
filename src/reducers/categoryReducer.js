import { CATEGORY_LIST, CATEGORY_CHANGE } from "../constants/constants";

export const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_LIST:
      return { ...state, categories: action.category.categories };

    case CATEGORY_CHANGE:
      return {
        ...state,
        currentCategory: action.category.currentCategory,
      };

    default:
      return state;
  }
};
