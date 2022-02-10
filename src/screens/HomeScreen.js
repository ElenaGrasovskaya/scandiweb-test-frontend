import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Product from "../components/Product";
import ProductList from "../components/ProductList"

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

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {currentCategory: localStorage.getItem("currentCategory")};
  }
    
  render() {
      
    const { categories, error, loading } = this.props.data;

    let productList = [];
    if (!loading && !error) {
      
      categories.forEach((element) => {
        if (element.name === this.state.currentCategory) {
          productList = [...element.products];
        }
      });

      console.log("productList", productList);
      return (
        <div>
          <h1>{this.state.currentCategory}</h1>
          <ProductList productList={productList} currentCategory = {this.state.currentCategory} />
         
        </div>
      );
    } else return <div>No data loaded</div>;
  }
}

export default graphql(PRODUCTS_LIST_QUERY)(HomeScreen);
