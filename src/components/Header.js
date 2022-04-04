import React, { PureComponent } from "react";
import Currency from "./Currency";
import Category from "./Category";
import Cart from "./Cart";
import { connect } from "react-redux";
import styled from "styled-components";
import logo from "../assets/logo.svg";

const StyledHeader = styled.div`
  display: grid;
  z-index: 100;
  grid-template-columns: 1fr 9fr 1fr 1fr;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 7vh;
  background-color: white;
 `;
const StyledLogo = styled.div`
  margin: auto;
`;

class Header extends PureComponent {
  render() {
    return (
      <>
        <StyledHeader>
          <Category />
          <StyledLogo>
            <img src={logo} height='40rem' width='40rem' />
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
