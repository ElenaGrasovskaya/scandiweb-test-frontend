import { bindActionCreators } from "redux";
import { CURRENCY_LOAD_LIST, CURRENCY_CHANGE } from "../constants/constants";

export const currencyReducer = (
  state = { currentCategory: "", categories: [] },
  action
) => {
  switch (action.type) {
    case CURRENCY_LOAD_LIST:
      return {
        ...state,
        currencies: action.payload,
      };

    case CURRENCY_CHANGE:
      return {
        ...state,
        currentCurrency: action.payload,
      };

    default:
      return state;
  }
};
