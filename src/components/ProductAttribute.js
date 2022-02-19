import React, { Component } from "react";
import styled from "styled-components";

const StyledAttributeName = styled.h2`
  font-family: "Roboto", sans-serif;
`;
const StyledSwatchContainer = styled.h2`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
const StyledRadioButton = styled.label`
  display: flex;
  align-items: center;
    justify-content: center;
  text-align:center;
  color: black;
  border: solid black 2px;
  width: 5rem;
  height: 4rem;
  font-size: 0.8em;
  justify-content: space-evenly;
  background-color: white;
  background-color: ${(props) => props.background};
  text-transform: uppercase;

  & input {
    display: none;
  }
`;

export default class ProductAttribute extends Component {
  render() {
    console.log("Attributes props", this.props);
    return (
      <div>
        {this.props.attributes.map((attribute) => (
          <div>
            <StyledAttributeName>{attribute.name}</StyledAttributeName>
            <StyledSwatchContainer>
               {attribute.items.map((item, index) => (
                <StyledRadioButton
                  for={item.id}
                  background={item.value}
                  key={index + 900}
                >
                  {item.displayValue}{" "}
                  <input
                    type='radio'
                    id={item.id}
                    name={attribute.name}
                    value={item.value}
                  ></input>
                </StyledRadioButton>
              ))}
            </StyledSwatchContainer>
          </div>
        ))}
      </div>
    );
  }
}
