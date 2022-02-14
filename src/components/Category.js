import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeCategory, categoryLoadList } from "../actions/categoryActions";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const CATEGORY_LIST_QUERY = gql`
  query PRODUCTS_LIST_QUERY {
    categories {
      name
    }
  }
`;
class Category extends Component {
  handleChangeCategory = (newCategory) => {
    return this.props.changeCategory(newCategory);
  };
  handleCategoryLoadList = (categoryList) => {
    this.props.categoryLoadList(categoryList);
  };

  render() {
    console.log(this.props);
    const { categories, error, loading } = this.props.data;
    let categoryList=[];
    (!error&&!loading)?categoryList = categories.map((category)=>(category.name)):categoryList=[];
    console.log(categoryList);



    return (
      <>
        <button onClick={() => this.handleChangeCategory("sfsf")}>
          Change
        </button>
        ;
        <button onClick={() => this.handleCategoryLoadList(categoryList)}>
          Load
        </button>
        ;
        <ul>{(categoryList.map((category, index)=>(<li key={index}>{category}</li>)))}</ul>
      </>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      changeCategory,
      categoryLoadList,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(CATEGORY_LIST_QUERY)(Category));
