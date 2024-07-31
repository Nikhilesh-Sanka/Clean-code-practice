import {
  validateAddProductInputs,
  extractProductNameWithoutSpaces,
} from "./src/applicationLogic.js";

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
