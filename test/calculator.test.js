const { somar, diminuir } = require("../src/calculator");

test("Somar dois valores válidos", async () => {
  expect(somar(5, 10)).toStrictEqual(15);
});

test("diminuir dois valores válidos", async () => {
  expect(diminuir(20, 10)).toStrictEqual(10);
});
