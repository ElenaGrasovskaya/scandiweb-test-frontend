import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import ProductAttribute from "../components/ProductAttribute";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const PRODUCT_DETAILS_QUERY = gql`
  query PRODUCT_DETAILS_QUERY($id: String!) {
    product(id: $id) {
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: "",
    };
  }

  render() {
    console.log("ProductScreen", this.props);
    console.log("ProductScreen State", this.state);

    const { loading, error } = this.props.data;
    if (!loading && !error) {
      const { product } = this.props.data;

      console.log("product", product);
      return (
        <>
          <StyledContainer>
            <StyledImagePicker>
              {product.gallery.map((image, index) => (
                <a
                  key={index + 500}
                  onClick={() => this.setState({ currentImage: image })}
                >
                  <img src={image} />
                </a>
              ))}
            </StyledImagePicker>
            <StyledImageView>
              <img src={this.state.currentImage || product.gallery[0]}></img>
            </StyledImageView>
            <StyledProductDetails>
              <h1>{product.name}</h1>
              <ProductAttribute attributes={product.attributes}></ProductAttribute>
            
              <div>{ReactHtmlParser(product.description)}</div>


            </StyledProductDetails>
          </StyledContainer>
        </>
      );
    } else return null;
  }
}

function mapStateToProps(state) {
  return { ...state, ID: window.location.pathname.split("/")[2] };
}

export default connect(mapStateToProps)(
  graphql(PRODUCT_DETAILS_QUERY, {
    options: (props) => ({
      variables: {
        id: props.ID,
      },
    }),
  })(ProductScreen)
);

const StyledContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5rem;
  width: 95vw;
  margin: 10rem auto 0 auto;
`;

const StyledImagePicker = styled.div`
  min-width: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & img {
    object-fit: cover;
    width: 10rem;
    height: 10rem;
  }
`;

const StyledImageView = styled.div`
min-width: 40vw;
  & img {
    
    width: 50rem;
    height: 50rem;
  }
`;

const StyledProductDetails = styled.div`
  display: flex;
  flex-direction:column;
  min-width: 30vw;
`;
