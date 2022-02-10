import PropTypes from "prop-types";
import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from 'react-apollo';
import Product from "../components/Product";

const PRODUCTS_LIST_QUERY = gql`
  query PRODUCTS_LIST_QUERY {
    categories {
      name
      products {
        id
        name
        description
      }
    }
  }
`;

class HomeScreen extends Component {
    render() {
    
    const {categories, error, loading} = this.props.data;
    console.log("error", error);
    console.log("loading", loading);
    console.log("categories", categories);
    const currentCategory = localStorage.getItem('currentCategory');
    alert(currentCategory);
    
    return <div>

    </div>;
  }
}

export default graphql(PRODUCTS_LIST_QUERY)(HomeScreen);


