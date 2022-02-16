import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeCurrency, currencyLoadList } from "../actions/currencyActions";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import styled from "styled-components";
const StyledDropdownContainer = styled.div`
  position: relative;
`;

const StyledDropdown = styled.div`
  position: absolute;
  background-color: white;
  width: 7rem;
  list-style: none;
  display:flex;
  flex-direction: column;
  gap: 0.5rem;
`;
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

  render() {
    const { currencies, error, loading } = this.props.data;
    console.log("currencyList", currencies);
    console.log("currencyState", this.state);

    if (!error && !loading) {
      return (
        <StyledDropdownContainer>
          <h2>{this.props.currency.currentCurrency.symbol}</h2>
          <StyledDropdown>
            {currencies.map((currency, index) => (
              <li
                onClick={() =>
                  this.handleChangeCurrency(currency.label, currency.symbol)
                }
                key={Math.round(Math.random() * 10000)}
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
