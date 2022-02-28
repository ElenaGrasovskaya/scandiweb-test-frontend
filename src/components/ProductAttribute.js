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
    this.props.saveSelectedAttributes(this.state.productId, this.state.attributes);
  }
  handleSaveSelectedAttributes = (productId, attributes) => {
   return this.props.saveSelectedAttributes(productId, attributes);
  };

  handleChange = (attribute, value) => {
    const newState = this.state.attributes.map((pair) => {
      if (pair.attribute === attribute) {
        pair.value = value;
      }
      return pair;
    });
    console.log("New Attribute State", newState);
    this.setState({
      attributes: [...newState],
      productId: this.props.productId,
    });
    this.handleSaveSelectedAttributes(this.state.productId, this.state.attributes);
  };

  render() {
    console.log("Attributes props", this.props);
    console.log("Attributes state", this.state);

    return (
      <div>
        {this.props.attributes.map((attribute, index) => (
          <div key={index + 400}>
            <StyledAttributeName key={index + 300}>
              {attribute.name}:
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
                    defaultChecked={index === 0}
                    onChange={() => {
                      this.handleChange(attribute.id, item.value);
                    }}
                  ></StyledCustomCheckbox>
                  <label htmlFor={attribute.id + item.id} key={index + 200}>
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
`;
const StyledSwatchContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
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
    width: 4rem;
    height: 3rem;
    font-weight: 400;
    font-size: 1em;

    justify-content: space-evenly;

    text-transform: uppercase;
  }
  &:checked + label {
    background-color: black;
    color: white;
  }
`;
