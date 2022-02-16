import { CURRENCY_LIST, CURRENCY_CHANGE } from "../constants/constants";

export const currencyReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENCY_LIST:
      return { ...state, currencies: action.currency.currencies };

    case CURRENCY_CHANGE:
      return {
        ...state,
        currentCurrency: {
          label: action.currency.currentCurrency.label,
          symbol: action.currency.currentCurrency.symbol
        }
      };

    default:
      return state;
  }
};

