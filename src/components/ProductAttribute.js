import React, { PureComponent } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveSelectedAttributes } from "../actions/currentProductActions";

class ProductAttribute extends PureComponent {
  constructor(props) {
    super(props);
    this.RandomIndex = Math.random() * 10000;
    this.prepareState = () => {
      //if store contains  selected attributes, they are loaded to preState
      // if not, default values are assigned as attributes
      let preState = [];

      this.props.selectedAttributes.forEach((item) => {
        if (item.productId === this.props.productId) {
          preState = [...item.attributes];
        }
      });

      if (preState.length < 2) {
        this.props.attributes.map((attribute) => {
          preState.push({
            attribute: attribute.name,
            value: attribute.items[0].displayValue,
          });
        });
      }

      return preState;
    };
    this.state = {
      attributes: [...this.prepareState()],
      productId: this.props.productId,
    };
    this.props.saveSelectedAttributes(
      //either default or modified values are sent to the store
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

    this.setState({
      attributes: [...newState],
      productId: this.props.productId,
    });

    this.props.getNewAttributes(this.state.attributes);

    this.handleSaveSelectedAttributes(
      this.state.productId,
      this.state.attributes
    );
  };
  checkSelectedAttribute = (attributeName, value) => {
    //this check defines which options
    //should be highlighted in radio button sets
    let checked = false;
 
    if (this.props.scale==1)
    {
      
      this.state.attributes.forEach((pair) => {
        if (pair.attribute === attributeName && pair.value === value) {
          checked = true;
          return;
        }
      });
    }

    else{

      this.props.selectedAttributes.forEach((pair) => {

        if (pair.attribute === attributeName && pair.value === value) {
          checked = true;
          return;
        }
      });
    }

    return checked;
  };

  render() {
    return (
      <div>
        {this.props.attributes.map((attribute, index) => (
          <div key={index + 130 + this.RandomIndex}>
            <StyledAttributeName
              scale={this.props.scale}
              key={index + 140 + this.RandomIndex}
            >
              {attribute.name}:
            </StyledAttributeName>
            <StyledSwatchContainer
              scale={this.props.scale}
              key={index + 150 + this.RandomIndex}
            >
              {attribute.items.map((item, index) => (
                <div key={index + 300 + this.RandomIndex}>
                  <StyledCustomCheckbox
                    type='radio'
                    id={
                      this.state.productId + attribute.name + item.displayValue + this.RandomIndex
                    }
                    name={this.state.productId + attribute.name}
                    value={item.displayValue}
                    background={item.value}
                    scale={this.props.scale}
                    checked={this.checkSelectedAttribute(
                      attribute.name,
                      item.displayValue
                    )}
                    onChange={() => {
                      this.handleChange(attribute.name, item.displayValue);
                    }}
                  ></StyledCustomCheckbox>
                  <label
                    key={this.RandomIndex}
                    htmlFor={
                      this.state.productId + attribute.name + item.displayValue + this.RandomIndex
                    }
                  >
                    {item.displayValue}
                  </label>
                </div>
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
    border: solid black 1px;
    width: calc(${(props) => props.scale}*4rem);
    height: calc(${(props) => props.scale}*3rem);
    font-weight: 400;
    font-size: calc(${(props) => props.scale}*1em);

    justify-content: space-evenly;

    text-transform: uppercase;
  }
  &:checked + label {
    background-color: black !important;
    color: white;
  }
`;
