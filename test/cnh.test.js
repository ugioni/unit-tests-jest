const { obterCnh } = require("../src/cnh");

test("Validando CNH com idade 18 anos", async () => {
  expect(obterCnh(21)).toBeTruthy();
});

test("Validando CNH com idade 15 anos", async () => {
  expect(obterCnh(15)).toBeFalsy();
});
