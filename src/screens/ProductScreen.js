import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import ProductAttribute from "../components/ProductAttribute";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { addToCart } from "../actions/cartActions";

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
  handleAddToCart = (product, qty=1) => {
    this.props.addToCart(product, qty) ;
   
  };


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
            <StyledProductGallery>
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
            </StyledProductGallery>
            <StyledProductDetails>
              <h1>{product.name}</h1>
              <ProductAttribute
                attributes={product.attributes}
                productId={this.props.ID}
              ></ProductAttribute>
              <StyledDescription>
                Price:
                {product.prices.map((price) => {
                  if (
                    price.currency.label ===
                    this.props.currency.currentCurrency.label
                  ) {
                    return (
                      <>
                        {price.amount}
                        {price.currency.symbol}
                      </>
                    );
                  }
                })}
              </StyledDescription>
              <StyledButton>add to cart</StyledButton>

              <StyledDescription>
                {ReactHtmlParser(product.description)}
              </StyledDescription>
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
    height: auto;
  }
`;

const StyledButton = styled.button`
  min-width: 20vw;
  background-color: green;
  height: 5rem;
  color: white;
  font-size: 1.5em;
  font-weight: 500;
  text-transform: uppercase;
  border: none;
  &:hover {
    background-color: lightgreen;
  }
  &:active {
    background-color: lightgreen;
    border: 1px solid grey;
  }
`;

const StyledProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20vw;
  & p {
    font-size: 1.5em;
    font-weight: 500;
  }
  & h1 {
    font-size: 2em;
  }
`;

const StyledProductGallery = styled.div`
  min-width: 50vw;
  display: flex;
  flex-direction: row;
`;
const StyledDescription = styled.p`
  margin-top: 5rem;
  font-size: 1.5rem;
`;
