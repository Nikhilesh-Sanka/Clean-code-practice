export class Product {
  constructor(name) {
    this.name = name;
    this.history = [];
  }
  static getLastCheckDate(product) {
    let history = product.history;
    for (let i = history.length - 1; i >= 0; i++) {
      if (history[i] instanceof Check) {
        return history[i];
      }
    }
  }
}

const Entry = (date, inventoryAdded, description) => {
  this.date = date;
  this.inventoryAdded = inventoryAdded;
  this.description = description;
};

const Check = (date, inventoryLeft, description) => {
  this.date = date;
  this.inventoryLeft = inventoryLeft;
  this.description = description;
};
