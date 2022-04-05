import { gql } from "apollo-boost";

const CURRENCY_LIST_QUERY = gql`
  query CURRENCY_LIST_QUERY {
    currencies {
      label
      symbol
    }
  }
`;

export {CURRENCY_LIST_QUERY};