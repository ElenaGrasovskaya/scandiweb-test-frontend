import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import cart from "../assets/cart.png";
import { addToCart } from "../actions/cartActions";
import { saveSelectedAttributes } from "../actions/currentProductActions";
import { bindActionCreators } from "redux";

class Product extends Component {
  constructor(props) {
    super(props);
    this.defaultAttributes = () => {
      let defaultAttr = [];
      this.props.displayedProduct.attributes.map((attribute) =>
        defaultAttr.push({
          attribute: attribute.name,
          value: attribute.items[0].displayValue,
        })
      );
      alert(this.props.displayedProduct.id);
      return {
        attributes: [...defaultAttr],
        productId: this.props.displayedProduct.id,
      };
    };
  }
  handleAddToCart = (product, qty) => {
    this.props.addToCart(product, qty);
  };

  render() {
    console.log("Product props", this.props);
    const { id, name, prices, gallery } = this.props.displayedProduct;
    localStorage.setItem(
      "currentCurrency",
      this.props.currency.currentCurrency
    );

    return (
      <StyledProduct>
        <StyledCartIcon
          src={cart}
          onClick={() => {
            this.handleAddToCart(this.props.displayedProduct, 1);
          }}
        ></StyledCartIcon>

        <StyledLink to={`/product/${id}`}>
          <StyledProductImage
            src={gallery[0]}
            height='300px'
          ></StyledProductImage>

          <StyledProductName>{name}</StyledProductName>
          {prices.map((price, index) => {
            if (
              price.currency.label === this.props.currency.currentCurrency.label
            )
              return (
                <p key={Math.round(index+50)}>
                  <strong>
                    {price.currency.symbol}
                    {price.amount}
                  </strong>
                </p>
              );
          })}
        </StyledLink>
      </StyledProduct>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCart,
      saveSelectedAttributes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Product);

const StyledCartIcon = styled.img`
  position: absolute;
  border: none;
  display: block;
  top: 19.35rem;
  left: 16.5rem;
  width: 3.5rem;
  height: 3.5rem;
  padding: 1rem;
  object-fit: contain;
  border-radius: 50%;
  background-color: var(--green);
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
