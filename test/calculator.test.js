const { somar, diminuir, multiplicar, dividir } = require("../src/calculator");

test("Somar dois valores válidos", async () => {
  expect(somar(150, 25)).toStrictEqual(175);
});

test("Diminuir dois valores válidos", async () => {
  expect(diminuir(150, 25)).toStrictEqual(125);
});

test("Multiplicar dois valores válidos", async () => {
  expect(multiplicar(5, 10)).toStrictEqual(50);
});

test("Dividir dois valores válidos", async () => {
  expect(dividir(20, 10)).toStrictEqual(2);
});
