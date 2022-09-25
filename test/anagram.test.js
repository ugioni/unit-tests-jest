const { isAnagram } = require("../src/anagram");

test("Validando anagrama válido", async () => {
  expect(isAnagram("satc", "ctas")).toBeTruthy();
});

test("Validando anagrama inválido", async () => {
  expect(isAnagram("satc", "testes")).toBeFalsy();
});
