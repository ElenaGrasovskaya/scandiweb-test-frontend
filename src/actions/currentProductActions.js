import {
    CURRENT_PRODUCT_SAVE, CURRENT_PRODUCT_ATTRIBUTES
  } from "../constants/constants";
  
  
  export const saveCurrentProduct = (currentProduct) => ({
    type: CURRENT_PRODUCT_SAVE,
    currentProduct: {...currentProduct}
  });
  
  export const saveSelectedAttributes = (productId, attributes) => ({
    type: CURRENT_PRODUCT_ATTRIBUTES,
    selectedAttributes: {
      productId: productId, 
      attibutes: [...attributes]  
    }, 
  });
  
   