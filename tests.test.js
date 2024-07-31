import {
  validateAddProductInputs,
  extractProductNameWithoutSpaces,
  getTotalSales,
  getDifferenceBetweenDates,
} from "./src/applicationLogic.js";
import { Product, Entry, Check } from "./src/objects";

export const testProduct = new Product("test");
testProduct.history.push(new Entry("", 10, ""));
testProduct.history.push(new Entry("", 12, ""));
testProduct.history.push(new Entry("", 11, ""));
testProduct.history.push(new Entry("", 3, ""));
testProduct.history.push(new Check("", 20, ""));
testProduct.history.push(new Check("", 30, ""));

test("it validates correct product names", () => {
  expect(validateAddProductInputs("   cipla")).toContain(true);
  expect(validateAddProductInputs("Omnipresol")).toContain(true);
});

test("it rejects wrong product names", () => {
  expect(validateAddProductInputs("  9cipla")).toContain(false);
  expect(validateAddProductInputs(" &cipla")).toContain(false);
});

test("it extracts the name correctly", () => {
  expect(extractProductNameWithoutSpaces("    Cipla")).toBe("Cipla");
});

test("it gets total sales", () => {
  expect(getTotalSales(testProduct)).toBe(-10);
});

test("it gets difference between dates", () => {
  expect(getDifferenceBetweenDates("17/10/2024", "17/10/2025")).toBe(365);
});
