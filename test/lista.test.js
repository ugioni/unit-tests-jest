const ListaDeCompras = require("../src/lista");

describe("lista de compras", () => {
  test("deve adicionar item na lista", () => {
    // Arrange
    const lista = new ListaDeCompras();

    // Act
    lista.adicionarItem("arroz");

    // Assert
    expect(lista.obterItens()).toEqual(["arroz"]);
  });

  test("deve remover item existente da lista", () => {
    // Arrange
    const lista = new ListaDeCompras();
    lista.adicionarItem("arroz");
    lista.adicionarItem("feijao");

    // Act
    lista.removerItem("arroz");

    // Assert
    expect(lista.obterItens()).toEqual(["feijao"]);
  });

  test("deve lancar erro ao tentar remover item inexistente", () => {
    // Arrange
    const lista = new ListaDeCompras();

    // Act
    const acao = () => lista.removerItem("cafe");

    // Assert
    expect(acao).toThrow("Item não encontrado na lista");
  });
});
