import { Product, Entry, Check } from "./objects";

export let productsObject = {
  products: [],
  currentProduct: "",
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

/*searching products*/
export const getProductsFromString = (string) => {
  let result = [];
  for (let product of productsObject.products) {
    if (product.name.includes(string)) {
      result.push(product);
    }
  }
  return result;
};
export const getNameForId = (name) => {
  return name.replaceAll(/\s/g, "-");
};
/*searching products*/

/*adding entries*/
export const addEntry = (inventoryAdded, description) => {
  let date = new Date();
  let stringDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  let newEntry = new Entry(stringDate, parseInt(inventoryAdded), description);
  productsObject.currentProduct.history.push(newEntry);
  localStorage.setItem("products", JSON.stringify(productsObject.products));
};
/*adding entries*/

/*adding checks*/
export const addCheck = (inventoryLeft, description) => {
  let date = new Date();
  let stringDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  let newCheck = new Check(stringDate, parseInt(inventoryLeft), description);
  productsObject.currentProduct.history.push(newCheck);
  localStorage.setItem("products", JSON.stringify(productsObject.products));
};
/*adding checks*/

/*getting total sales*/
export const getTotalSales = (product) => {
  let history = product.history;
  let count = 0;
  let check1;
  let check2;
  for (let historyPoint of [...history].reverse()) {
    if (historyPoint.type === "Check") {
      if (check1 === undefined) {
        check1 = historyPoint.inventoryLeft;
      } else {
        check2 = historyPoint.inventoryLeft;
        break;
      }
    } else if (check1 !== undefined) {
      count += historyPoint.inventoryAdded;
    }
  }
  if (check1 === undefined) {
    return false;
  }
  check2 = check2 === undefined ? 0 : check2;
  return check2 + count - check1;
};
/*getting total sales*/

/*getting Notification worth products*/
export const getNotificationWorthyProducts = (days) => {
  let finalArray = [];
  let currentDate = new Date();
  let currentDateString = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
  for (let product of productsObject.products) {
    if (Product.getLastCheckDate(product) !== undefined) {
      if (
        getDifferenceBetweenDates(
          Product.getLastCheckDate(product),
          currentDateString
        ) >= days
      ) {
        finalArray.push(product);
      }
    }
  }
  return finalArray;
};
export const getDifferenceBetweenDates = (date1, date2) => {
  let day1 = parseInt(date1.slice(0, 2));
  let month1 = parseInt(date1.slice(3, 5));
  let year1 = parseInt(date1.slice(6, 10));
  let day2 = parseInt(date2.slice(0, 2));
  let month2 = parseInt(date2.slice(3, 5));
  let year2 = parseInt(date2.slice(6, 10));
  return day2 - day1 + (month2 - month1) * 30 + (year2 - year1) * 365;
};
/*getting Notification worth products*/
