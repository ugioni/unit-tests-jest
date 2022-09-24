const { somar,diminuir,multiplicar,dividir } = require("../src/calculator");

test("Somar dois valores válidos", async () => {
  expect(somar(5, 10)).toStrictEqual(15);
});