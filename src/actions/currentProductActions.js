import {
    CURRENT_PRODUCT_SAVE
  } from "../constants/constants";
  
  
  export const saveCurrentProduct = (currentProduct) => ({
    type: CURRENT_PRODUCT_SAVE,
    currentProduct: {...currentProduct}
  });
  
  
   