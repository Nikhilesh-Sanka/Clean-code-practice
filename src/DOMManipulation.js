import {
  validateAddProductInputs,
  doesProductAlreadyExist,
  extractProductNameWithoutSpaces,
  addProduct,
  productsObject,
  getProductsFromString,
  addEntry,
  getNameForId,
  addCheck,
  getTotalSales,
  getNotificationWorthyProducts,
} from "./applicationLogic";

let noOfDays = 0;

let DOMObjects = {
  display: document.querySelector("#display"),
};

/*Add Product Functionality*/
export const showAddProductForm = () => {
  DOMObjects.display.innerHTML = `<h2>Add New Product</h2>
                        <form action="" novalidate id="add-product-form">
                            <label for="product-name">Enter Product Name</label>
                            <input id="product-name" type="text" name="product-name" autocomplete="off"/>
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
  if (productsObject.currentProduct !== "") {
    openProduct(productsObject.currentProduct);
  } else {
    DOMObjects.display.innerHTML = ``;
  }
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

/*Search Product Functionality */
export const addProductsToSidebarDisplay = (products) => {
  document.querySelector("#sidebar-display").innerHTML = "";
  for (let product of products) {
    let div = document.createElement("div");
    div.className = "sidebar-product";
    div.id = `${getNameForId(product.name)}`;
    div.innerText = `${product.name}`;
    document.querySelector("#sidebar-display").appendChild(div);
    document
      .querySelector(`#${getNameForId(product.name)}`)
      .addEventListener("click", () => {
        openProduct(product);
      });
  }
};

export const getSearchProducts = (string) => {
  let result = getProductsFromString(string);
  addProductsToSidebarDisplay(result);
};
export const focusSearchBar = () => {
  document.querySelector("#search-bar").focus();
};
/*Search Product Functionality */

/*open Product Functionality*/
export const openProduct = (product) => {
  productsObject.currentProduct = product;
  DOMObjects.display.innerHTML = `<h2>${
    product.name.slice(0, 1).toUpperCase() + product.name.slice(1)
  } History</h2>
   <div class="product-history"></div>`;
  for (let historyPoint of product.history) {
    let div = document.createElement("div");
    div.className = "product-history-point";
    div.innerHTML = `<p>${historyPoint.type}</p>
                       <p>${historyPoint.date}</p>
                       <p>${
                         historyPoint.inventoryAdded
                           ? "Inventory Added : " +
                             historyPoint.inventoryAdded +
                             " pcs"
                           : "Inventory Left : " +
                             historyPoint.inventoryLeft +
                             " pcs"
                       }
                       <p>${historyPoint.description}</p>`;
    document.querySelector(".product-history").appendChild(div);
  }
  let buttonsDiv = document.createElement("div");
  buttonsDiv.className = "product-history-buttons";
  buttonsDiv.innerHTML = `  <button>Add Entry</button>
                            <button>Add Check</button>
                            <button>Total Sales</button>`;
  document.querySelector(".product-history").appendChild(buttonsDiv);
  document
    .querySelector(".product-history-buttons > button:nth-child(1)")
    .addEventListener("click", showAddEntryForm);
  document
    .querySelector(`.product-history-buttons > button:nth-child(2)`)
    .addEventListener("click", showAddCheckForm);
  document
    .querySelector(".product-history-buttons > button:last-child")
    .addEventListener("click", showSalesPopup);
};
/*open Product Functionality*/

/*Adding Entries*/
const showAddEntryForm = () => {
  DOMObjects.display.innerHTML = `  <h2>Add Entry</h2>
                                    <form
                                        action=""
                                        id="add-entry-form"
                                        class="add-entry-check-form"
                                        novalidate
                                    >
                                        <label for="add-entry-inventory">Inventory Added</label>
                                        <input id="add-entry-inventory" type="number"/>
                                        <label for="add-entry-description">Add Description</label>
                                        <textarea id="add-entry-description"></textarea>
                                        <button id="add-entry-submit" type="button">Submit</button>
                                        <button id="add-entry-close" type="button">Close</button>
                                    </form>`;
  document
    .querySelector("#add-entry-submit")
    .addEventListener("click", submitAddEntryForm);
  document
    .querySelector("#add-entry-close")
    .addEventListener("click", (event) => {
      event.preventDefault();
      closeAddEntryForm();
    });
};
const closeAddEntryForm = () => {
  document.querySelector("#add-entry-inventory").value = "";
  document.querySelector("#add-entry-description").value = "";
  if (productsObject.currentProduct !== "") {
    openProduct(productsObject.currentProduct);
  } else {
    DOMObjects.display.innerHTML = ``;
  }
};
const submitAddEntryForm = (event) => {
  event.preventDefault();
  let inventoryField = document.querySelector("#add-entry-inventory");
  let descriptionField = document.querySelector("#add-entry-description");
  if (inventoryField.value !== "") {
    addEntry(inventoryField.value, descriptionField.value);
    closeAddEntryForm();
  } else {
    inventoryField.setCustomValidity("Please Enter a Number");
    inventoryField.reportValidity();
  }
};
/*Adding Entries*/

/*Adding Checks*/
const showAddCheckForm = () => {
  console.log("add check clicked");
  DOMObjects.display.innerHTML = `  <h2>Add Check</h2>
                                      <form
                                          action=""
                                          id="add-check-form"
                                          class="add-entry-check-form"
                                          novalidate
                                      >
                                          <label for="add-check-inventory">Inventory Left</label>
                                          <input id="add-check-inventory" type="number" />
                                          <label for="add-check-description">Add Description</label>
                                          <textarea id="add-check-description"></textarea>
                                          <button id="add-check-submit" type="button">Submit</button>
                                          <button id="add-check-close" type="button">Close</button>
                                      </form>`;
  document
    .querySelector("#add-check-submit")
    .addEventListener("click", submitAddCheckForm);
  document
    .querySelector("#add-check-close")
    .addEventListener("click", (event) => {
      event.preventDefault();
      closeAddCheckForm();
    });
};
const closeAddCheckForm = () => {
  document.querySelector("#add-check-inventory").value = "";
  document.querySelector("#add-check-description").value = "";
  if (productsObject.currentProduct !== "") {
    openProduct(productsObject.currentProduct);
  } else {
    DOMObjects.display.innerHTML = ``;
  }
};
const submitAddCheckForm = (event) => {
  event.preventDefault();
  let inventoryField = document.querySelector("#add-check-inventory");
  let descriptionField = document.querySelector("#add-check-description");
  if (inventoryField.value !== "") {
    addCheck(inventoryField.value, descriptionField.value);
    closeAddCheckForm();
  } else {
    inventoryField.setCustomValidity("Please Enter a Number");
    inventoryField.reportValidity();
  }
  updateNotificationToUser();
};
/* Adding Checks */

/*showing total sales*/
const showSalesPopup = () => {
  console.log(productsObject.currentProduct);
  document.querySelector("#blur").classList.remove("close");
  document.querySelector("#total-sales-pop-up").classList.remove("close");
  let result = getTotalSales(productsObject.currentProduct);
  if (result !== false) {
    document.querySelector(
      "#total-sales-pop-up > p:last-child"
    ).innerText = `Total Sales : ${result}`;
  } else {
    document.querySelector(
      "#total-sales-pop-up > p:last-child"
    ).innerText = `Please Enter any checks`;
  }
  document
    .querySelector("#total-sales-close-button")
    .addEventListener("click", closeSalesPopup);
};
const closeSalesPopup = () => {
  document.querySelector("#blur").classList.add("close");
  document.querySelector("#total-sales-pop-up").classList.add("close");
};
/*showing total sales*/

/*showing notification section*/
export const openNotificationSection = () => {
  DOMObjects.display.innerHTML = `<h2>Notifications</h2>`;
  let notificationProducts = getNotificationWorthyProducts(noOfDays);
  for (let product of notificationProducts) {
    let div = document.createElement("div");
    div.id = `notification${getNameForId(product.name)}`;
    div.className = "notification-point";
    div.innerHTML = `<p>${product.name}</p>
                       <p>Time to add a check!!!</p>`;
    DOMObjects.display.appendChild(div);
    console.log(div.id);
    document
      .querySelector(`#notification${getNameForId(product.name)}`)
      .addEventListener("click", () => {
        openProduct(product);
      });
  }
};
export const updateNotificationToUser = () => {
  if (getNotificationWorthyProducts(noOfDays).length === 0) {
    document.querySelector("#notification-marker").classList.add("hide");
    return;
  }
  document.querySelector("#notification-marker").classList.remove("hide");
};
/*showing notification section*/
