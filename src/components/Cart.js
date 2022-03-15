import React, { Component } from "react";
import cart_black from "../assets/cart_black.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeFromCart, changeItemQTY } from "../actions/cartActions";
import ProductAttribute from "./ProductAttribute";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false, total: this.calculateSumm() };
  }

  handleRemoveFromCart = (productName) => {
    this.props.removeFromCart(productName);
  };

  handleChangeQty = (productName, newQty) => {
    this.props.changeItemQTY(productName, newQty);
  };

  calculateSumm = () => {
    let summ = 0;
    this.props.cart.cartItems.forEach((item) => {
      item.prices.forEach((price) => {
        if (
          price.currency.label === this.props.currency.currentCurrency.label
        ) {
          return (summ = summ + price.amount * item.qty);
        } else return summ;
      });
    });

    return summ.toFixed(2);
  };

  render() {
    const itemNum = this.props.cart.cartItems.length;

    return (
      <>
        <StyledLink
          onClick={() => this.setState({ clicked: !this.state.clicked })}
          clicked={this.state.clicked}
        >
          <StyledItemNum>
            <span>{itemNum}</span>
          </StyledItemNum>
          <img src={cart_black} />
        </StyledLink>

        <CartPopup clicked={this.state.clicked}>
          {this.props.cart.cartItems.map((item, index) => (
            <StyledCartItem key={index + 10}>
              <StyledItemDescription key={index + 20}>
                <h2 key={index + 30}>
                  {item.brand}
                  <br /> {item.name}
                </h2>
                <h3 key={index + 40}>
                  Price:{" "}
                  {item.prices.map((price) => {
                    if (
                      price.currency.label ===
                      this.props.currency.currentCurrency.label
                    ) {
                      return (
                        <div>
                          {price.amount}
                          {price.currency.symbol}
                        </div>
                      );
                    }
                  })}
                </h3>
                <ProductAttribute
                  key={index + 50}
                  attributes={item.attributes}
                  productId={item.id}
                  scale={0.6}
                ></ProductAttribute>
              </StyledItemDescription>
              <StyledQuantity key={index + 60}>
                <button
                  key={index + 90}
                  onClick={() => {
                    this.handleChangeQty(item.name, item.qty + 1);
                    this.setState({ total: this.calculateSumm() });
                  }}
                >
                  +
                </button>
                {item.qty < 1 ? 1 : item.qty}

                <button
                  onClick={() => {
                    this.handleChangeQty(
                      item.name,
                      item.qty - 1 < 1 ? 1 : item.qty - 1
                    );
                    this.setState({ total: this.calculateSumm() });
                  }}
                >
                  -
                </button>
              </StyledQuantity>
              <div>
                <StyledItemPreview key={index + 70} src={item.gallery[0]} />
              </div>
              <StyledQuantity key={index + 80}>
                <button
                  onClick={() => {
                    this.handleRemoveFromCart(item.name);
                    this.setState({ total: this.calculateSumm() });
                  }}
                >
                  X
                </button>
              </StyledQuantity>
            </StyledCartItem>
          ))}
          <StyledTotal>
            <span>Items:</span>{" "}
            <span>
              {this.props.cart.cartItems.reduce(
                (acc, item) => +acc + Number(item.qty),
                0
              )}
            </span>
          </StyledTotal>
          <StyledTotal>
            <span>Total:</span> <span>{this.calculateSumm()}</span>
          </StyledTotal>
          <StyledTotal>
            <Link
              to='/cart'
              onClick={() => this.setState({ clicked: !this.state.clicked })}
            >
              <StyledSubmitButton>view bag</StyledSubmitButton>
            </Link>
            <Link
              to='/'
              onClick={() => this.setState({ clicked: !this.state.clicked })}
            >
              <StyledSubmitButton>check out</StyledSubmitButton>
            </Link>
          </StyledTotal>
        </CartPopup>
        <StyledBackground clicked={this.state.clicked}></StyledBackground>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const StyledBackground = styled.div`
  position: absolute;
  top: 7vh;
  left: 0;
  width: 100vw;
  opacity: ${(props) => (props.clicked ? "50%" : "0%")};
  height: ${(props) => (props.clicked ? "100vh" : "0")};
  background-color: grey;

  transition: opacity 0.5s ease-out;
`;

const CartPopup = styled.div`
  user-select: none;
  top: 7vh;

  position: absolute;
  right: 5vw;

  background-color: white;
  z-index: 500;

  opacity: ${(props) => (props.clicked ? "100%" : "0%")};
  width: ${(props) => (props.clicked ? "40rem;" : "0rem")};
  transition: all 0.5s ease-out;
  animation-delay: -2s;
`;

const StyledLink = styled.a`
  user-select: none;
  text-decoration: none;
  color: black;
  position: relative;
  & img {
    position: absolute;
    top: 50%;
    left: -10%;
    transform: translate(-50%, -50%);
    height: 1.8rem;
  }
`;

const StyledItemNum = styled.div`
  position: relative;
  margin-top: 15px;
  margin-left: -5px;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: black;
  color: white;
  user-select: none;
  & span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    font-size: 0.8em;
  }
`;

const StyledCartItem = styled.div`
  color: black;
  width: 90%;
  margin: 1rem auto;

  display: flex;
  flex-direction: row;
  border-top: 1px solid lightgrey;
`;

const StyledItemDescription = styled.div`
  color: black;
  width: 20rem;

  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  & h2,
  h3 {
    font-size: 0.8rem;
  }
`;

const StyledItemPreview = styled.img`
  width: 7rem;
  margin: 1rem;
`;

const StyledTotal = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem;
  font-size: 1rem;
`;

const StyledSubmitButton = styled.button`
  width: 15rem;
  height: 3rem;
  text-transform: uppercase;
  font-size: 1rem;
  background-color: var(--green);
  color: white;
  border: none;
  border-radius: none;
  font-weight: 500;
  &:hover,
  :active {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const StyledQuantity = styled.div`
  color: black;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-between;
  font-size: 0.8rem;

  & button {
    font-weight: 400;
    font-size: 0.8rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: white;
    border-radius: none;
    border: 1px solid black;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
