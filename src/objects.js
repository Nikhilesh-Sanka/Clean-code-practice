export class Product {
  constructor(name) {
    this.name = name;
    this.history = [];
  }
  static getLastCheckDate(product) {
    let history = product.history;
    for (let i = history.length - 1; i >= 0; i++) {
      if (history[i].type === "Check") {
        return history[i].date;
      }
    }
  }
}

export function Entry(date, inventoryAdded, description) {
  this.date = date;
  this.type = "Entry";
  this.inventoryAdded = inventoryAdded;
  this.description = description;
}

export function Check(date, inventoryLeft, description) {
  this.date = date;
  this.type = "Check";
  this.inventoryLeft = inventoryLeft;
  this.description = description;
}
