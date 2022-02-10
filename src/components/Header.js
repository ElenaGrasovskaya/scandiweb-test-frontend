import React, { Component } from 'react'
import Currency from './Currency';
import Category from './Category';


export default class Header extends Component {
  render() {
    const currentCategory = 'all';
    localStorage.setItem('currentCategory', currentCategory);
    return (
      <div>Header <Currency /> <Category /></div>
    )
  }
}
