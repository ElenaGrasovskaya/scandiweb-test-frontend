import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { currencyReducer } from "./reducers/currencyReducer";
import { currentProductReducer } from "./reducers/currentProductReducer";
import { START_CATEGORY, START_CURRENCY_LABEL, START_CURRENCY_SYMBOL } from "./constants/constants";

const reducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer, 
  currency: currencyReducer, 
  product: currentProductReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentCategoryFromStorage = localStorage.getItem("currentCategory")
  ?(localStorage.getItem("currentCategory"))
  : START_CATEGORY;

const currentCurrencyLabel = localStorage.getItem("currentCurrencyLabel")
  ?(localStorage.getItem("currentCurrencyLabel"))
  : START_CURRENCY_LABEL;
  const currentCurrencySymbol = localStorage.getItem("currentCurrencySymbol")
  ?(localStorage.getItem("currentCurrencySymbol"))
  : START_CURRENCY_SYMBOL;


const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  category: { categories: [], currentCategory: currentCategoryFromStorage },
  currency: { currentCurrency: {label:currentCurrencyLabel, symbol:currentCurrencySymbol}, currencies: []},
  product: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
