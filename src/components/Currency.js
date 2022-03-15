import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeCurrency, currencyLoadList } from "../actions/currencyActions";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import styled from "styled-components";

const CURRENCY_LIST_QUERY = gql`
  query CURRENCY_LIST_QUERY {
    currencies {
      label
      symbol
    }
  }
`;

class Currency extends Component {
  handleChangeCurrency = (label, symbol) => {
    return this.props.changeCurrency(label, symbol);
  };
  handleCurrencyLoadList = (currencyList) => {
    return this.props.currencyLoadList(currencyList);
  };

  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    const { currencies, error, loading } = this.props.data;

    if (!error && !loading) {
      return (
        <StyledDropdownContainer>
          <h2 onClick={() => this.setState({ clicked: !this.state.clicked })}>
            {this.props.currency.currentCurrency.symbol}
            <StyledArrow clicked={this.state.clicked}>&#62;</StyledArrow>
          </h2>
          <StyledDropdown
            clicked={this.state.clicked}
            onClick={() => this.setState({ clicked: !this.state.clicked })}
          >
            {currencies.map((currency, index) => (
              <li
                onClick={() =>
                  this.handleChangeCurrency(currency.label, currency.symbol)
                }
                key={index+110}
              >
                {currency.symbol}&nbsp;{currency.label}
              </li>
            ))}
          </StyledDropdown>
        </StyledDropdownContainer>
      );
    } else {
      return <div>No data</div>;
    }
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeCurrency,
      currencyLoadList,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(CURRENCY_LIST_QUERY)(Currency));

const StyledDropdownContainer = styled.div`
  position: relative;
  user-select: none;
`;

const StyledArrow = styled.span`
  display: block;
  position: absolute;
  left: 2rem;
  top: 1.8rem;
  font-size: 0.8em;
  font-weight: 200;

  transform: ${(props) => (props.clicked ? "rotate(-90deg)" : "rotate(90deg)")};
  transition: all 0.2s ease;
`;

const StyledDropdown = styled.ul`
  position: absolute;
  z-index: 2000;
  left: 1.2rem;
  top: 3rem;
  margin: 0;
  padding: 1rem;
  background-color: white;
  width: 5rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: ${(props) => (props.clicked ? "flex" : "none")};
  opacity: ${(props) => (props.clicked ? "100%" : "0%")};
  transition: opacity 0.2s ease;
  & li:hover {
    display: block;
    color: var(--green);
  }
`;
