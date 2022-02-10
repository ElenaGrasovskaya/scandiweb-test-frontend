import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Product extends Component {
  
  render() {
    console.log(this.props);
    return (
      <div>Product</div>
    )
  }
}
