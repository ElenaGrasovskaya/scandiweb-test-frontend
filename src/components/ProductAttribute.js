import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveSelectedAttributes } from "../actions/currentProductActions";

class ProductAttribute extends Component {

  constructor(props) {
    super(props);
    this.state = {attributes:[]};
  }
  saveAttributes = (productId, attributeName, attributeValue) => {
    let attributes = [];

    this.props.saveSelectedAttributes(productId, attributeName, attributeValue);
  };

  render() {
    console.log("Attributes props", this.props);

    return (
      <div>
        {this.props.attributes.map((attribute, index) => (
          <div key={index + 400}>
            <StyledAttributeName key={index + 300}>
              {attribute.name}
            </StyledAttributeName>
            <StyledSwatchContainer key={index + 500}>
              {attribute.items.map((item, index) => (
                <>
                  <StyledCustomCheckbox
                    type='radio'
                    id={attribute.id + item.id}
                    name={attribute.name}
                    value={item.value}
                    background={item.value}
                    key={index + 100}
                    checked={index===0}
                    onClick={() => {
                      this.saveAttributes(
                        this.props.productId,
                        attribute.name,
                        item.value
                      );
                    }}
                  ></StyledCustomCheckbox>
                  <label htmlFor={attribute.id + item.id} key={index + 200}>
                    {item.displayValue}{" "}
                  </label>
                </>
              ))}
            </StyledSwatchContainer>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveSelectedAttributes,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductAttribute);

const StyledAttributeName = styled.h2`
  font-family: "Roboto", sans-serif;
`;
const StyledSwatchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const StyledCustomCheckbox = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;

  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    background-color: ${(props) => props.background};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: black;
    border: solid black 2px;
    width: 5rem;
    height: 4rem;
    font-weight: 400;
    font-size: 1.2em;

    justify-content: space-evenly;

    text-transform: uppercase;
  }
  &:checked + label {
    background-color: black;
    color: white;
  }
`;
