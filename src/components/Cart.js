import React, { Component } from "react";
import cart_black from "../assets/cart_black.png";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class Cart extends Component {
  render() {
    return (
      <StyledLink to={"/cart/"}>
        <img src={cart_black} />
      </StyledLink>
    );
  }
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  position: relative;
  & img {
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
    height: 1.8rem;
  }
`;
