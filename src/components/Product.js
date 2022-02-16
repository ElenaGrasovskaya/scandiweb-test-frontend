import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledProduct = styled.div`
  margin: auto;
  width: 22rem;
  height: 27rem;
  padding: 1rem;
  text-decoration: none;
  &:hover,
  &:focus {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

const StyledProductImage = styled.img`
  width: 20rem;
  height: 20rem;

  object-fit: contain;
  overflow: hidden;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
`;

const StyledProductName = styled.h2`
  font-weight: 300;
  font-size: 1.1em;
`;

const StyledProductLink = styled(Link)`
  color: black;
  text-decoration: none;
`;
class Product extends Component {
  render() {
    console.log("Product props", this.props);
    const { id, name, description, prices, brand, gallery } = this.props;
    localStorage.setItem(
      "currentCurrency",
      this.props.currency.currentCurrency
    );
    return (
      <StyledProduct>
        <StyledProductLink
          to={`/product/${id}`}
          key={Math.round(Math.random() * 10000)}
          style={{ textDecoration: "none" }}
        >
          <StyledProductImage src={gallery[0]} height='300px' />
          <StyledProductName>{name}</StyledProductName>
          {prices.map((price) => {
            if (price.currency.label === this.props.currency.currentCurrency.label)
              return (
                <p key={Math.round(Math.random() * 10000)}>
                  <strong>
                    {price.currency.symbol}
                    {price.amount}
                  </strong>
                </p>
              );
          })}
        </StyledProductLink>
      </StyledProduct>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Product);
