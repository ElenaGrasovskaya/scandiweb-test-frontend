import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { currencyReducer } from "./reducers/currencyReducer";
import { START_CATEGORY, START_CURRENCY } from "./constants/constants";

const reducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer, 
  currency: currencyReducer, 
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentCategoryFromStorage = localStorage.getItem("currentCategory")
  ?(localStorage.getItem("currentCategory"))
  : START_CATEGORY;

const currentCurrencyFromStorage = localStorage.getItem("currentCurrency")
  ?(localStorage.getItem("currentCurrency"))
  : START_CURRENCY;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  category: { categories: [], currentCategory: currentCategoryFromStorage },
  currency: { currentCurrency: currentCurrencyFromStorage, currencies: []},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
