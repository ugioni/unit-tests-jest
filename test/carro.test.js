const Carro = require("../src/carro");

describe("carro", () => {
  test("deve criar carro com kilometragem inicial 0", () => {
    // Arrange
    const marca = "Ford";
    const modelo = "Ka";
    const ano = 2020;

    // Act
    const carro = new Carro(marca, modelo, ano);

    // Assert
    expect(carro.kilometragem).toBe(0);
  });

  test("deve somar kilometragem ao dirigir distancia positiva", () => {
    // Arrange
    const carro = new Carro("Ford", "Ka", 2020);

    // Act
    carro.dirigir(50);

    // Assert
    expect(carro.kilometragem).toBe(50);
  });

  test("nao deve alterar kilometragem ao dirigir distancia zero ou negativa", () => {
    // Arrange
    const carro = new Carro("Ford", "Ka", 2020);

    // Act
    carro.dirigir(0);
    carro.dirigir(-10);

    // Assert
    expect(carro.kilometragem).toBe(0);
  });

  test("deve retornar informacoes formatadas do carro", () => {
    // Arrange
    const carro = new Carro("Ford", "Ka", 2020);
    carro.dirigir(12);

    // Act
    const info = carro.obterInfo();

    // Assert
    expect(info).toBe("Ford Ka, Ano: 2020, Quilometragem: 12 km");
  });
});
