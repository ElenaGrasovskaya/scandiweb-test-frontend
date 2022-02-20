import {
    CURRENT_PRODUCT_SAVE, CURRENT_PRODUCT_ATTRIBUTES
  } from "../constants/constants";
  
  
  export const saveCurrentProduct = (currentProduct) => ({
    type: CURRENT_PRODUCT_SAVE,
    currentProduct: {...currentProduct}
  });
  
  export const saveSelectedAttributes = (productId, attributeName, attributeValue) => ({
    type: CURRENT_PRODUCT_ATTRIBUTES,
    selectedAttributes: {
      productId: productId, 
      attibutes:   [{
        attributeName: attributeName,
        attributeValue: attributeValue
      }]   
    }, 
  });
  
   