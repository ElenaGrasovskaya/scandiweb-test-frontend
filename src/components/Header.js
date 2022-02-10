import React, { Component } from "react";
import Currency from "./Currency";
import Category from "./Category";
import Cart from "./Cart";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const CATEGORY_LIST_QUERY = gql`
  query PRODUCTS_LIST_QUERY {
    categories {
      name
    }
  }
`;



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {currentCategory: localStorage.getItem("currentCategory")||"all"};
      }
    
  render() {
    const { categories, error, loading } = this.props.data;

    const currentCurrency = "USD";
    localStorage.setItem("currentCategory", this.state.currentCategory);
    localStorage.setItem("currentCurrency", currentCurrency);
    console.log("Header category", categories);
    
    
    if (!error && !loading) {
      return (
        <div className='Header'>
          <ul>
            {categories.map((category, index) => (
              <li key={index} ><a href="#" onClick = {()=>{
                  this.state.currentCategory = category.name;
                  localStorage.setItem("currentCategory", category.name); 
            
            }}>{category.name}</a></li>
            ))}
          </ul>
          Header <Currency /> <Category /> <Cart />
        </div>
      );
    }
    else return null;
  }
}


export default graphql(CATEGORY_LIST_QUERY)(Header);
