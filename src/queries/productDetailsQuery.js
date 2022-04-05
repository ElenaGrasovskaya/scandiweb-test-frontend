import { gql } from "apollo-boost";

const PRODUCT_DETAILS_QUERY = gql`
  query PRODUCT_DETAILS_QUERY($id: String!) {
    product(id: $id) {
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
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
`;

export {PRODUCT_DETAILS_QUERY};