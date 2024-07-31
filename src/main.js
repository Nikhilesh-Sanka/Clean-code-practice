import "./styles.css";
import searchIcon from "./images/search-icon.svg";
import { productsObject } from "./applicationLogic.js";
import {
  showAddProductForm,
  getSearchProducts,
  focusSearchBar,
  updateNotificationToUser,
  openNotificationSection,
} from "./DOMManipulation.js";

if (localStorage.getItem("products") !== null) {
  productsObject.products = JSON.parse(localStorage.getItem("products"));
}
function addImage(image, parentNode) {
  let newImage = new Image();
  newImage.src = image;
  newImage.id = "search-icon";
  parentNode.prepend(newImage);
}
addImage(searchIcon, document.querySelector("#search"));

updateNotificationToUser();
document
  .querySelector("#add-product")
  .addEventListener("click", showAddProductForm);

document.querySelector("#search-bar").addEventListener("input", (event) => {
  getSearchProducts(event.target.value);
});
document
  .querySelector("#search-icon")
  .addEventListener("click", focusSearchBar);
document
  .querySelector("#notification")
  .addEventListener("click", openNotificationSection);
