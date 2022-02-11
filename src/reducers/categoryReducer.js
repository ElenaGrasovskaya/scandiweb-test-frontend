import { bindActionCreators } from "redux";
import { CATEGORY_LOAD_LIST, CATEGORY_CHANGE } from "../constants/constants";

export const categoryReducer = (
  state = { currentCategory: "", categories: [] },
  action
) => {
  switch (action.type) {

    case CATEGORY_LOAD_LIST:
      return {
        ...state,
        categories: action.payload,
      };

    case CATEGORY_CHANGE:
      return {
        ...state,
        currentCategory: action.payload,
      };

    default:
      return state;
  }
};
