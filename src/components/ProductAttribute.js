import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveSelectedAttributes } from "../actions/currentProductActions";

class ProductAttribute extends Component {
  constructor(props) {
    super(props);
    this.prepareState = () => {
      let preState = [];
      this.props.attributes.map((attribute) =>
        preState.push({
          attribute: attribute.name,
          value: attribute.items[0].value,
        })
      );
      return preState;
    };
    this.state = {
      attributes: [...this.prepareState()],
      productId: this.props.productId,
    };
    this.props.saveSelectedAttributes(
      this.state.productId,
      this.state.attributes
    );
  }
  handleSaveSelectedAttributes = (productId, attributes) => {
    this.props.saveSelectedAttributes(productId, attributes);
  };

  handleChange = (attribute, value) => {
    const newState = this.state.attributes.map((pair) => {
      if (pair.attribute === attribute) {
        pair.value = value;
      }
      return pair;
    });
    console.log("newState", newState);

    this.setState({
      attributes: [...newState],
      productId: this.props.productId,
    });
    this.handleSaveSelectedAttributes(
      this.state.productId,
      this.state.attributes
    );
  };
  checkSelectedAttribute = (productId, attributeName, value) => {
    let checked = false;
    this.props.product.selectedAttributes.forEach((pair) => {
      if (pair.productId === productId) {
        pair.attributes.forEach((attribute) => {
          if (
            attribute.attribute === attributeName &&
            attribute.value === value
          ) {
            checked = true;
          } else checked = false;
        });
      }
    });
    return checked;
  };

  render() {
    console.log("AttR Props", this.props);
    console.log("AttR State", this.state);
    return (
      <div>
        {this.props.attributes.map((attribute, index) => (
          <div key={index + 400}>
            <StyledAttributeName scale={this.props.scale} key={index + 300}>
              {attribute.name}:
            </StyledAttributeName>
            <StyledSwatchContainer scale={this.props.scale} key={index + 500}>
              {attribute.items.map((item, index) => (
                <>
                  <StyledCustomCheckbox
                    type='radio'
                    id={this.state.productId+attribute.name}
                    name={this.state.productId+attribute.name}
                    value={item.displayValue}
                    background={item.displayValue}
                    key={index + 100}
                    scale={this.props.scale}
                    checked={this.checkSelectedAttribute(
                      this.state.productId,
                      attribute.name,
                      item.displayValue
                    )}
                    onChange={() => {
                      this.handleChange(attribute.id, item.value);
                      
                    }}
                  ></StyledCustomCheckbox>
                  <label
                    htmlFor={this.state.productId+attribute.name}
                    key={index + 200}
                  >
                    {item.displayValue}
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

  font-size: ${(props) => props.scale}em;
`;
const StyledSwatchContainer = styled.form`
  display: flex;
  flex-direction: row;
  gap: calc(${(props) => props.scale}*1.5rem);
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
    color: #333;
    border: solid black 2px;
    width: calc(${(props) => props.scale}*4rem);
    height: calc(${(props) => props.scale}*3rem);
    font-weight: 400;
    font-size: calc(${(props) => props.scale}*1em);

    justify-content: space-evenly;

    text-transform: uppercase;
  }
  &:checked + label {
    background-color: black;
    color: white;
  }
`;
