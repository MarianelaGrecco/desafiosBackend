// export const ERROR_INFO = {
//     PRODUCT_TITLE_INVALID: "El título del producto debe ser una cadena de texto válida, recibido: {productTitle}",
//     PRODUCT_TYPE_INVALID: "El tipo del producto debe ser una cadena de texto válida, recibido: {productType}",
//     PRODUCT_REQUIRED_INVALID: "El valor de 'required' del producto debe ser un booleano válido, recibido: {productRequired}",
//     PRODUCT_DESCRIPTION_INVALID: "La descripción del producto debe ser una cadena de texto válida, recibido: {productDescription}",
//     PRODUCT_CODE_INVALID: "El código del producto debe ser una cadena de texto válida, recibido: {productCode}",
//     PRODUCT_CATEGORY_INVALID: "La categoría del producto debe ser una cadena de texto válida, recibido: {productCategory}",
//     PRODUCT_PRICE_INVALID: "El precio del producto debe ser un número válido, recibido: {productPrice}",
//     PRODUCT_STOCK_INVALID: "El stock del producto debe ser un número válido, recibido: {productStock}",
//     PRODUCT_STATUS_INVALID: "El estado del producto debe ser uno de los siguientes valores: 'available' o 'out of stock', recibido: {productStatus}",
//   };

export const generateProductErrorInfo = (product) => {
  return `One or more properties were incomplete or not valid.
    List of required properties:
    
  *title: needs to be a String, received ${product.title}
    
  *type: needs to be a String, received ${product.type}
  
  *required: needs to be a Boolean, received ${product.required}
  
  *description: needs to be a String, received ${product.description}
  
  *code: needs to be a String, received ${product.code}
  
  *category: needs to be a String, received ${product.category}
  
  *price: needs to be a Number, received ${product.price}
  
  *stock: needs to be a Number between 1 and 100, received ${product.stock}`;
};
