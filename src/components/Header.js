import React, { Component } from "react";
import Currency from "./Currency";
import Category from "./Category";
import Cart from "./Cart";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: localStorage.getItem("currentCategory") || "all",
    };
  }

  render() {
    //const { category, error, loading } = this.props.data;

    const currentCurrency = "USD";
    //const categoryList = Category.handleCategoryList();
    //localStorage.setItem("currentCategory", this.state.currentCategory);
    localStorage.setItem("currentCurrency", currentCurrency);
   // console.log("Header category", categoryList);

   /* if (!error && !loading) {
      return (
        <div className='Header'>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <a
                  href='#'
                  onClick={() => {
                    this.state.currentCategory = category.name;
                    localStorage.setItem("currentCategory", category.name);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
          <Category /> <Currency /> <Cart />
        </div>
      );
    } else
    */ return <><Category /> <Currency /> <Cart /></>;
  }
}



function mapStateToProps(state) {

  return state;
}

export default connect(mapStateToProps)(Header);

