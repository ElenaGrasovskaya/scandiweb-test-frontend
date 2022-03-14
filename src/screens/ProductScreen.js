import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import ProductAttribute from "../components/ProductAttribute";
import { addToCart } from "../actions/cartActions";
import { bindActionCreators } from "redux";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

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
      qty: 1,
    };
  }
  handleAddToCart = (product, qty) => {
    this.props.addToCart(product, qty);
  };

  render() {
    const { loading, error } = this.props.data;
    if (!loading && !error) {
      const product = { ...this.props.data.product, id: this.props.ID };

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
                    <img src={image} key={index + 600} />
                  </a>
                ))}
              </StyledImagePicker>
              <StyledImageView>
                <img src={this.state.currentImage || product.gallery[0]}></img>
              </StyledImageView>
            </StyledProductGallery>
            <StyledProductDetails>
              <h1>{product.brand}</h1>
              <h2>{product.name}</h2>
              <ProductAttribute
                scale={1}
                attributes={product.attributes}
                productId={product.id}
              ></ProductAttribute>
              <StyledPrice>
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
              </StyledPrice>
              <form>
                <StyledQuantity htmlFor='qty'>
                  Quantity:{" "}
                  <input
                    type='number'
                    value={this.state.qty}
                    id='qty'
                    min='1'
                    max='100'
                    onChange={(event) =>
                      this.setState({ qty: event.target.value })
                    }
                  ></input>
                </StyledQuantity>

                <StyledButton
                  inStock={product.inStock}
                  onClick={(event) => {
                    event.preventDefault();
                    product.inStock &&
                      this.handleAddToCart(product, this.state.qty);
                  }}
                >
                  add to cart
                </StyledButton>
              </form>

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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addToCart,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
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

const StyledPrice = styled.div`
  font-size: 1.5em;
  font-weight: 500;
  margin: 2rem 0;
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
    width: 40rem;
    height: auto;
  }
`;

const StyledQuantity = styled.label`
  font-size: 1.4em;
  display: inline-block;

  & input {
    margin-bottom: 2rem;
    width: 5rem;
    height: 2rem;
    font-size: 1em;
    border-radius: none;
    border: 1px solid black;
    &:active,
    :focus {
      border-radius: none;
      border-color: var(--green);
    }
  }
`;

const StyledButton = styled.button`
  display: block;
  min-width: 100%;
  background-color: ${(props) =>
    props.inStock ? "var(--green)" : "lightgrey"};
  height: 5rem;
  color: white;
  font-size: 1.5em;
  font-weight: 500;
  text-transform: uppercase;
  border: none;
  &:hover {
    background-color: ${(props) =>
      props.inStock ? "var(--lightgreen)" : "lightgrey"};
  }
  &:active {
    background-color: var(--lightgreen);
    border: 1px solid grey;
  }
`;

const StyledProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;

  & p {
    font-size: 1.1em;
    font-weight: 300;
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
const StyledDescription = styled.div`
  margin-top: 5rem;
  font-size: 1.5rem;
`;
