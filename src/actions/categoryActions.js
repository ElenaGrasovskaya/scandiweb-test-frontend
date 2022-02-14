import {
  CATEGORY_LIST,
  CATEGORY_CHANGE,
} from "../constants/constants";


export const changeCategory = (newCategory) => ({
  type: CATEGORY_CHANGE,
  category: {currentCategory: newCategory}
});

export const categoryLoadList = (categoryList) =>(
  {
    type: CATEGORY_LIST,
    category: {categories: categoryList}
  }
)
 

