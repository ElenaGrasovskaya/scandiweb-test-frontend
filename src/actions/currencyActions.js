import {
  CURRENCY_LIST,
  CURRENCY_CHANGE,
} from "../constants/constants";


export const changeCurrency = (newLabel, newSymbol) => ({
  type: CURRENCY_CHANGE,
  currency: {currentCurrency: {
    label:newLabel,
    symbol:newSymbol,
  }}
});

export const currencyLoadList = (currencyList) => (
  {
    type: CURRENCY_LIST,
    currency: {currencies: currencyList}
  }
)
 
