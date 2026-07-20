const { obterCnh } = require("../src/cnh");

describe("cnh", () => {
  test("deve retornar true para idade igual ou maior que 18", () => {
    // Arrange
    const idade = 18;

    // Act
    const resultado = obterCnh(idade);

    // Assert
    expect(resultado).toBe(true);
  });

  test("deve retornar false para idade menor que 18", () => {
    // Arrange
    const idade = 17;

    // Act
    const resultado = obterCnh(idade);

    // Assert
    expect(resultado).toBe(false);
  });
});
