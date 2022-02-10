import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Product extends Component {
  render() {
    console.log(this.props);
    const { id, name, description, prices, brand, gallery } = this.props;
    const currentCurrency = localStorage.getItem("currentCurrency");
    return (
      <div className='productCard'>
        <Link to={`/product/${id}`}>
          <img src={gallery[0]} height='300px' width='300px' />
          <p>{name}</p>
          <p>{prices[0].amount}</p>
        </Link>
      </div>
    );
  }
}
