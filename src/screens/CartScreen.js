import React, { Component } from "react";
import ProductAttribute from "../components/ProductAttribute";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeFromCart } from "../actions/cartActions";
import { bindActionCreators } from "redux";

class CartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = [];
  }
  handleRemoveFromCart = (productName) => {
    this.props.removeFromCart(productName);
  };
  render() {
    console.log("CartScreen", this.props);
    return (
      <StyledContainer>
        <h1>Cart</h1>
        {this.props.cart.cartItems.map((item, index) => (
          <StyledCartItem key={index+200}>
            <StyledItemDescription>
              <h2>
                {item.brand}
                <br /> {item.name}
              </h2>
              <h3>
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
              <ProductAttribute key={index+100}
                attributes={item.attributes}
                productId={item.selectedAttributes.productId}
              ></ProductAttribute>
            </StyledItemDescription>
            <StyledQuantity><button>+</button>{item.qty}<button>-</button></StyledQuantity>
            <div><StyledItemPreview src={item.gallery[0]} /></div>
            <StyledQuantity><button onClick={()=>this.handleRemoveFromCart(item.name)}>X</button></StyledQuantity>
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

`;

const StyledItemDescription = styled.div`
  color: black;
  width: 45rem;
 
  display: flex;
  flex-direction: column;
  margin-right: 2rem;

`;

const StyledItemPreview = styled.img`
  width: 20rem;
  height: 20rem;
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


