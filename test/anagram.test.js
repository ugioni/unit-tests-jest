const { isAnagram } = require("../src/anagram");

describe("anagram", () => {
  test("deve retornar true para palavras anagramas ignorando maiusculas e pontuacao", () => {
    // Arrange
    const primeira = "Dormitory";
    const segunda = "Dirty room!!";

    // Act
    const resultado = isAnagram(primeira, segunda);

    // Assert
    expect(resultado).toBe(true);
  });

  test("deve retornar false para palavras que nao sao anagramas", () => {
    // Arrange
    const primeira = "teste";
    const segunda = "toast";

    // Act
    const resultado = isAnagram(primeira, segunda);

    // Assert
    expect(resultado).toBe(false);
  });
});
