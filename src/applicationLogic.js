import { Product } from "./objects";

export let productsObject = {
  products: [],
};

/*adding product*/
export const validateAddProductInputs = (productName) => {
  if (/^\s*[0-9]/.test(productName)) {
    return [false, "Product name cannot start with a number"];
  } else if (/^\s*[a-z]/i.test(productName)) {
    return [true];
  }
  return [false, "Product name cannot start with any special characters"];
};

export const doesProductAlreadyExist = (productName) => {
  if (
    productsObject.products.some(
      (product) => product.name === productName.toLowerCase()
    )
  ) {
    return true;
  }
  return false;
};

export const addProduct = (productName) => {
  productsObject.products.push(new Product(productName.toLowerCase()));
  localStorage.setItem("products", JSON.stringify(productsObject.products));
};

export const extractProductNameWithoutSpaces = (productName) => {
  return productName.slice(productName.match(/^\s*/)[0].length);
};
/*adding product*/
