import React, { Component } from "react";
import Currency from "./Currency";
import Category from "./Category";
import Cart from "./Cart";
import { connect } from "react-redux";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 9fr 1fr 1fr;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 7vh;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
const StyledLogo = styled.div`
  margin: auto;
`;

class Header extends Component {
  render() {
    return (
      <>
        <StyledHeader>
          <Category />
          <StyledLogo>
            <img src={logo} height='35vh' width='35vw' />
          </StyledLogo>{" "}
          <Currency /> <Cart />
        </StyledHeader>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Header);
