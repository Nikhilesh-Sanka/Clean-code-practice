import {
  validateAddProductInputs,
  doesProductAlreadyExist,
  extractProductNameWithoutSpaces,
  addProduct,
  productsObject,
} from "./applicationLogic";

let DOMObjects = {
  display: document.querySelector("#display"),
};

/*Add Product Functionality*/
export const showAddProductForm = () => {
  DOMObjects.display.innerHTML = `<h2>Add New Product</h2>
                        <form method="'post" action="" novalidate id="add-product-form">
                            <label for="product-name">Enter Product Name</label>
                            <input id="product-name" type="text" name="product-name" />
                            <button id="add-product-submit">Submit</button>
                            <button id="add-product-close">Close</button>
                        </form>`;
  document
    .querySelector("#add-product-submit")
    .addEventListener("click", (event) => {
      event.preventDefault();
      submitAddProductForm();
    });
  document
    .querySelector("#add-product-close")
    .addEventListener("click", (event) => {
      event.preventDefault();
      closeAddProductForm();
    });
};

export const closeAddProductForm = () => {
  document.querySelector("#product-name").value = "";
  DOMObjects.display.innerHTML = "";
};

export const submitAddProductForm = () => {
  let productNameField = document.querySelector("#product-name");
  let productName = extractProductNameWithoutSpaces(productNameField.value);
  if (!validateAddProductInputs(productName)[0]) {
    productNameField.setCustomValidity(
      validateAddProductInputs(productName)[1]
    );
    productNameField.reportValidity();
    return;
  } else if (doesProductAlreadyExist(productName)) {
    productNameField.setCustomValidity("Product Name Already Exists");
    productNameField.reportValidity();
    return;
  }
  addProduct(productName);
  console.log(productsObject.products);
  closeAddProductForm();
};
/*Add Product Functionality*/
