import { CURRENCY_LOAD_LIST, CURRENCY_CHANGE } from "../constants/constants";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo";

const CURRENCY_LIST_QUERY = gql`
  query CURRENCY_LIST_QUERY {
    currencies {
      label
      symbol
    }
  }
`;

export const changeCurrency = (newCurrency) => async (dispatch) => {
  dispatch({
    type: CURRENCY_CHANGE,
    payload: { newCurrency },
  });

  localStorage.setItem("currentCurrency", newCurrency);
};

export const categoryLoadList = () => (dispatch) => {
  const { loading, error, currencies } = useQuery(CURRENCY_LIST_QUERY);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let currencyNames = [];
  currencies.array.forEach((element) => {
    currencyNames.push(element.name);
  });

  dispatch({
    type: CURRENCY_LOAD_LIST,
    payload: currencyNames,
  });
  localStorage.setItem("currencies", currencyNames);
};
