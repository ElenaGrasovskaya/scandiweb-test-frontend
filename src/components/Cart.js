import React, { Component } from "react";
import cart_black from "../assets/cart_black.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Cart extends Component {
  
  render() {
    const itemNum = this.props.cart.cartItems.length;

    return (
      <StyledLink to={"/cart/"}>
        <StyledItemNum><span>{itemNum}</span></StyledItemNum>
        <img src={cart_black} />
      </StyledLink>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Cart);

const StyledLink = styled(Link)`
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
& span {
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    font-size: 0.8em;

}
 
`;

