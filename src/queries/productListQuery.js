import { gql } from "apollo-boost";

const PRODUCTS_LIST_QUERY = gql`
  query PRODUCTS_LIST_QUERY {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export {PRODUCTS_LIST_QUERY};