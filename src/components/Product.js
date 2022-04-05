import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import cart from "../assets/cart.png";
import { addToCart } from "../actions/cartActions";
import { bindActionCreators } from "redux";

class Product extends PureComponent {
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

      return {
        attributes: [...defaultAttr],
        productId: this.props.displayedProduct.id,
      };
    };
  }
  handleAddToCart = (product, qty, selectedAttributes) => {
    this.props.addToCart(product, qty, selectedAttributes);
  };

  render() {
    const { id, name, prices, gallery, inStock } = this.props.displayedProduct;
    localStorage.setItem(
      "currentCurrency",
      this.props.currency.currentCurrency
    );

    return (
      <StyledProduct inStock={inStock}>
        <StyledCartIcon
          inStock={inStock}
          src={cart}
          onClick={() => {
            inStock &&
              this.handleAddToCart(
                this.props.displayedProduct,
                1,
                this.defaultAttributes().attributes
              );
          }}
        ></StyledCartIcon>

        <StyledLink to={`/product/${id}`}>
          <StyledProductImage
            inStock={inStock}
            src={gallery[0]}
            height='300px'
          ></StyledProductImage>

          <StyledProductName>{name}</StyledProductName>
          {prices.map((price, index) => {
            if (
              price.currency.label === this.props.currency.currentCurrency.label
            )
              return (
                <p key={index + 120}>
                  <strong>
                    {price.currency.symbol}
                    {price.amount.toFixed(2)}
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
  background-color: ${(props) =>
    props.inStock ? "var(--green)" : "lightgrey"};
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
  opacity:  ${(props) => (props.inStock ? 1 : 0.5)};

  &:hover,
  &:active,
  &:focus {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    ${StyledCartIcon} {
      opacity: 100%;
    }
  }
  &::after {
    content: "out of stock";
    position: absolute;
    top: 0;
    left: 0;
    width: 20rem;
    height: 20rem;

    text-transform: uppercase;
    width: 22rem;
    opacity: 60%;
    padding-top: 40%;

    font-size: 2rem;
    color: black;
    text-align: center;
    display: ${(props) => (props.inStock ? "none" : "block")};
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
