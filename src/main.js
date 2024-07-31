import "./styles.css";
import searchIcon from "./images/search-icon.svg";
import { productsObject } from "./applicationLogic.js";
import {
  showAddProductForm,
  closeAddProductForm,
  submitAddProductForm,
} from "./DOMManipulation.js";

if (localStorage.getItem("products") !== null) {
  productsObject.products = JSON.parse(localStorage.getItem("products"));
}
function addImage(image, parentNode) {
  let newImage = new Image();
  newImage.src = image;
  parentNode.prepend(newImage);
}
addImage(searchIcon, document.querySelector("#search"));

document
  .querySelector("#add-product")
  .addEventListener("click", showAddProductForm);
