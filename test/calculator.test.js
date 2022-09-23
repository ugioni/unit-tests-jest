const { soma } = require("../src/calculator");

test("soma", async () => {
  expect(soma(5, 10)).toStrictEqual(15);
});
