import React, { Component } from 'react'
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const PRODUCT_DETAIL_QUERY = gql`
query PRODUCT_DETAIL_QUERY($id:!String)
{
  product(id:$id)
  {
    name
    inStock
    gallery
    description
    attributes
    {
      id
      name
      type
      items
      {
        displayValue
        value
        id
      }
    }
    prices
    {
      currency
      {
        label
        symbol
      }
      amount
    }
    brand
  }
} 
`;

export default class ProductScreen extends Component {
  render() {
    return (
      <div>ProductScreen</div>
    )
  }
}
