import React, { PureComponent } from "react";
import { graphql } from "react-apollo";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { saveCurrentProduct } from "../actions/currentProductActions";
import { bindActionCreators } from "redux";
import { saveSelectedAttributes } from "../actions/currentProductActions";
import { PRODUCTS_LIST_QUERY} from "../queries/productListQuery";



class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentCategory: [] };
     }
  handleSaveCurrentProduct = (product) => {
    this.props.saveCurrentProduct(product);
  };

  componentDidMount() {
    if (this.state.currentCategory !== this.props.category.currentCategory) {
      this.setState({ currentCategory: this.props.category.currentCategory });
    }
  }

  componentDidUpdate() {
    if (this.state.currentCategory !== this.props.category.currentCategory) {
      this.setState({ currentCategory: this.props.category.currentCategory });
    }
  }

  render() {
    localStorage.setItem(
      "currentCategory",
      this.props.category.currentCategory
    );
    localStorage.setItem(
      "currentCurrencyLabel",
      this.props.currency.currentCurrency.label
    );
    localStorage.setItem(
      "currentCurrencySymbol",
      this.props.currency.currentCurrency.symbol
    );

    const { categories, error, loading } = this.props.data;

    let productList = [];
    if (!loading && !error) {
      categories.forEach((element) => {
        if (element.name === this.state.currentCategory) {
          productList = [...element.products];
        }
      });

      return (
        <StyledHomeScreen>
          <StyledHeading>{this.state.currentCategory}</StyledHeading>
          <StyledProductList>
            {productList.map((product, index) => (
              <StyledProductLink
                onClick={() => {
                  this.handleSaveCurrentProduct(product);
                }}
                key={index+270}
              >
                <Product displayedProduct={product} />
              </StyledProductLink>
            ))}
          </StyledProductList>
        </StyledHomeScreen>
      );
    } else return <div>No data loaded</div>;
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveCurrentProduct,
      saveSelectedAttributes,
    },
    dispatch
  );

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(PRODUCTS_LIST_QUERY)(HomeScreen));

const StyledHomeScreen = styled.div`
  margin: 20vh 10vh;
`;
const StyledProductList = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5vw;
  align-items: flex-start;
  align-content: flex-start;
  justify-content: flex-start;
`;
const StyledHeading = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  text-transform: uppercase;
  margin-left: 1rem;
`;

const StyledProductLink = styled.div`
  color: black;
  text-decoration: none;
`;
