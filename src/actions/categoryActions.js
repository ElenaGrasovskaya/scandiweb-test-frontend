import { CATEGORY_LOAD_LIST, CATEGORY_CHANGE } from "../constants/constants";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import { useQuery } from "react-apollo";

const CATEGORY_LIST_QUERY = gql`
  query PRODUCTS_LIST_QUERY {
    categories {
      name
    }
  }
`;


export const changeCategory = (newCategory) => async (dispatch) => {
  
  dispatch({
    type: CATEGORY_CHANGE,
    payload: { newCategory},
  });

  localStorage.setItem("currentCategory", newCategory);
};

export const categoryLoadList = (id) => (dispatch, getState) => {
    const { loading, error, categories } = useQuery(CATEGORY_LIST_QUERY);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    let categoryNames = [];
    categories.array.forEach((element) => { categoryNames.push()
        
    });

  dispatch({
    type: CATEGORY_LOAD_LIST,
    payload: ,
  });
  localStorage.setItem("categories", );
};

