import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import cart from "../assets/cart.png";

class Product extends Component {
  handleAddToCart = () => {
    alert("Add to cart");
  };

  render() {
    const { id, name, description, prices, brand, gallery } = this.props;
    localStorage.setItem(
      "currentCurrency",
      this.props.currency.currentCurrency
    );

    return (
      <StyledProduct>
        <StyledCartIcon
          src={cart}
          onClick={this.handleAddToCart}
        ></StyledCartIcon>

        <StyledProductImage src={gallery[0]} height='300px' />

        <StyledProductName>{name}</StyledProductName>
        {prices.map((price) => {
          if (
            price.currency.label === this.props.currency.currentCurrency.label
          )
            return (
              <p key={Math.round(Math.random() * 10000)}>
                <strong>
                  {price.currency.symbol}
                  {price.amount}
                </strong>
              </p>
            );
        })}
      </StyledProduct>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Product);

const StyledCartIcon = styled.img`
  position: absolute;
  display: block;
  top: 19.35rem;
  left: 16.5rem;
  width: 3.5rem;
  height: 3.5rem;
  padding: 1rem;
  object-fit: contain;
  border-radius: 50%;
  background-color: green;
  opacity: 0%;
  transition: opacity 0.2s ease-in;
`;

const StyledProduct = styled.div`
  position: relative;
  margin: auto;
  width: 22rem;
  height: 27rem;
  padding: 1rem;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    ${StyledCartIcon} {
      opacity: 100%;
    }
  }
`;

const StyledProductImage = styled.img`
  width: 20rem;
  height: 20rem;
  object-fit: contain;
  overflow: hidden;
  border: 1px solid #eee;
`;

const StyledProductName = styled.h2`
  font-weight: 300;
  font-size: 1.1em;
`;


