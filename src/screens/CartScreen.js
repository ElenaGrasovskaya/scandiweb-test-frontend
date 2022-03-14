import React, { Component } from "react";
import ProductAttribute from "../components/ProductAttribute";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeFromCart, changeItemQTY } from "../actions/cartActions";
import { bindActionCreators } from "redux";

class CartScreen extends Component {
  handleRemoveFromCart = (productName) => {
    this.props.removeFromCart(productName);
  };

  handleChangeQty = (productName, newQty) => {
    this.props.changeItemQTY(productName, newQty);
  };

  render() {
    return (
      <StyledContainer>
        <h1>Cart</h1>
        {this.props.cart.cartItems.map((item, index) => (
          <StyledCartItem key={index + 200}>
            <StyledItemDescription key={index + 600}>
              <h2 key={index + 700}>
                {item.brand}
                <br /> {item.name}
              </h2>
              <h3 key={index + 800}>
                Price:{" "}
                {item.prices.map((price) => {
                  if (
                    price.currency.label ===
                    this.props.currency.currentCurrency.label
                  ) {
                    return (
                      <>
                        {price.amount}
                        {price.currency.symbol}
                      </>
                    );
                  }
                })}
              </h3>
              <ProductAttribute
                scale = {1}
                key={index + 100}
                attributes={item.attributes}
                productId={item.id}
              ></ProductAttribute>
            </StyledItemDescription>
            <StyledPreviewBlock>
              <StyledQuantity key={index + 500}>
                <button
                  key={index + 900}
                  onClick={() => this.handleChangeQty(item.name, item.qty + 1)}
                >
                  +
                </button>
                {item.qty < 1 ? 1 : item.qty}

                <button
                  onClick={() =>
                    this.handleChangeQty(
                      item.name,
                      item.qty - 1 < 1 ? 1 : item.qty - 1
                    )
                  }
                >
                  -
                </button>
              </StyledQuantity>
              <div>
                <StyledItemPreview key={index + 300} src={item.gallery[0]} />
              </div>
              <StyledQuantity key={index + 400}>
                <button onClick={() => this.handleRemoveFromCart(item.name)}>
                  X
                </button>
              </StyledQuantity>
            </StyledPreviewBlock>
          </StyledCartItem>
        ))}
      </StyledContainer>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      removeFromCart,
      changeItemQTY,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

const StyledContainer = styled.section`
  margin-top: 10rem;
  & h1 {
    text-transform: uppercase;
    font-size: 2rem;
    margin-left: 5%;
  }
`;

const StyledCartItem = styled.div`
  color: black;
  border-top: 1px solid lightgray;
  width: 90%;
  margin: 2rem auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const StyledPreviewBlock = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const StyledItemDescription = styled.div`
  color: black;
  width: 45rem;

  display: flex;
  flex-direction: column;
  margin-right: 2rem;
`;

const StyledItemPreview = styled.img`
  width: 15rem;
  margin: 2rem;
`;

const StyledQuantity = styled.div`
  color: black;
  width: 2rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  font-size: 1.4rem;

  & button {
    font-weight: 400;
    font-size: 1.2rem;
    width: 2rem;
    height: 2rem;
    background-color: white;
    border-radius: none;
    border: 1px solid black;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
