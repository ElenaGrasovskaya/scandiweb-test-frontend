import React, { Component } from 'react'
import Product from './Product';

export default class ProductList extends Component {
  render() {
    return (
      <div>
           {this.props.productList.map((product, index) => (
            <Product
              id={product.id}
              name={product.name}
              description={product.description}
              prices={product.prices}
              brand={product.brand}
              gallery={product.gallery}
              key={Math.round(Math.random() * 10000)}
            />
          ))}
      </div>
    )
  }
}
