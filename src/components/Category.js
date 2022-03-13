import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { changeCategory, categoryLoadList } from "../actions/categoryActions";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";
import styled from "styled-components";

const CATEGORY_LIST_QUERY = gql`
  query CATEGORY_LIST_QUERY {
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
    return this.props.categoryLoadList(categoryList);
  };

  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

  render() {
    const { categories, error, loading } = this.props.data;
    let categoryList = [];
    !error && !loading
      ? (categoryList = categories.map((category) => category.name))
      : (categoryList = []);

    return (
      <>
        <StyledList onLoad={() => this.handleCategoryLoadList(categoryList)}>
          {categoryList.map((category, index) => (
            <StyledItem key={index}>
              <StyledLink
                to={"/"}
                onClick={() => this.handleChangeCategory(category)}
              >
                {category}
              </StyledLink>
            </StyledItem>
          ))}
        </StyledList>
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

const StyledList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-evenly;
  text-transform: uppercase;
  font-size: 1.1em;
  gap: 1rem;
  margin: auto;
`;

const StyledItem = styled.li`
  display: block;
  height: 7vh;
  position: relative;
  min-width: 5vw;
  border-bottom: 3px solid white;
  transition: all 0.2s ease;
  &:hover {
    color: var(--green);
    border-bottom: 3px solid var(--green);
  }
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-decoration: none;
  color: inherit;
`;
