const { somar,diminuir,multiplicar,dividir } = require("../src/calculator");

test("Somar dois valores válidos", async () => {
  expect(somar(5, 10)).toStrictEqual(15);
});

test("diminuir dois valores válidos", async () => {
  expect(diminuir(20, 10)).toStrictEqual(10);
});

test("multiplicar dois valores válidos", async () => {
  expect(multiplicar(5, 10)).toStrictEqual(50);
});

test("dividir dois valores válidos", async () => {
  expect(dividir(10, 5)).toStrictEqual(2);
});
