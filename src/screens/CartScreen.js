import React, { Component } from "react";
import ProductAttribute from "../components/ProductAttribute";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeFromCart } from "../actions/cartActions";
import { bindActionCreators } from "redux";

class CartScreen extends Component {
  render() {
    console.log("CartScreen", this.props);
    return (
      <>
        <h1>Cart</h1>
        {this.props.cart.cartItems.map((item, index) => (
          <div>
            <div>
              <h2>
                {item.brand}
                <br /> {item.name}
              </h2>
              <h3>
                Price:
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
            </div>
            <div>quantity</div>
            <div>image</div>
          </div>
        ))}
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
