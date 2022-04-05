import { gql } from "apollo-boost";

const CATEGORY_LIST_QUERY = gql`
  query CATEGORY_LIST_QUERY {
    categories {
      name
    }
  }
`;

export {CATEGORY_LIST_QUERY};