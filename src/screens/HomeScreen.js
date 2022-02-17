import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import Product from "../components/Product";
import { connect } from "react-redux";
import styled from "styled-components";


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
    this.state = { currentCategory: [] };
  }

  render() {
    const { categories, error, loading } = this.props.data;
    if (this.state.currentCategory !== this.props.category.currentCategory) {
      this.setState({ currentCategory: this.props.category.currentCategory });
    }

    localStorage.setItem("currentCategory", this.props.category.currentCategory);
    localStorage.setItem("currentCurrencyLabel", this.props.currency.currentCurrency.label);
    localStorage.setItem("currentCurrencySymbol", this.props.currency.currentCurrency.symbol);


    let productList = [];
    if (!loading && !error) {
      categories.forEach((element) => {
        if (element.name === this.state.currentCategory) {
          productList = [...element.products];
        }

      });

      return (
        <StyledHomeScreen>
          <StyledHeading>{this.state.currentCategory}</StyledHeading>
          <StyledProductList>
            {productList.map((product) => (
              <Product 
                id={product.id}
                name={product.name}
                description={product.description}
                prices={product.prices}
                brand={product.brand}
                gallery={product.gallery}
                key={Math.round(Math.random() * 10000)}
              />
            ))}
          </StyledProductList>
        </StyledHomeScreen>
      );
    } else return <div>No data loaded</div>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(
  graphql(PRODUCTS_LIST_QUERY)(HomeScreen)
);


const StyledHomeScreen = styled.div`
margin: 20vh 10vh;
 
`;
const StyledProductList = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5vw;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
  
`;
const StyledHeading = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 1rem;
  
`;