const Banco = require("../src/banco");

describe("banco", () => {
  test("deve depositar e registrar transacao", () => {
    // Arrange
    const conta = new Banco("Conta A", 100);

    // Act
    const saldo = conta.depositar(50);

    // Assert
    expect(saldo).toBe(150);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Depósito", valor: 50 });
  });

  test("deve sacar com saldo suficiente", () => {
    // Arrange
    const conta = new Banco("Conta A", 100);

    // Act
    const saldo = conta.sacar(40);

    // Assert
    expect(saldo).toBe(60);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Saque", valor: 40 });
  });

  test("deve lancar erro ao sacar com saldo insuficiente", () => {
    // Arrange
    const conta = new Banco("Conta A", 20);

    // Act
    const acao = () => conta.sacar(21);

    // Assert
    expect(acao).toThrow("Saldo insuficiente");
  });

  test("deve transferir valor para conta de destino", () => {
    // Arrange
    const origem = new Banco("Origem", 200);
    const destino = new Banco("Destino", 20);

    // Act
    origem.transferir(50, destino);

    // Assert
    expect(origem.obterSaldo()).toBe(150);
    expect(destino.obterSaldo()).toBe(70);
    expect(origem.obterHistorico()).toContainEqual({
      tipo: "Transferência",
      valor: 50,
      destino: "Destino",
    });
  });

  test("deve definir e validar limite de saque", () => {
    // Arrange
    const conta = new Banco("Conta A", 1000);
    conta.definirLimiteDeSaque(300);

    // Act
    const dentroDoLimite = conta.verificarLimiteDeSaque(300);
    const acimaDoLimite = () => conta.verificarLimiteDeSaque(301);

    // Assert
    expect(dentroDoLimite).toBe(true);
    expect(acimaDoLimite).toThrow("Saque acima do limite permitido");
  });

  test("deve aplicar juros e registrar no historico", () => {
    // Arrange
    const conta = new Banco("Conta A", 100);

    // Act
    const saldoComJuros = conta.aplicarJuros(10);

    // Assert
    expect(saldoComJuros).toBe(110);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Juros", valor: 10 });
  });

  test("deve pagar conta e registrar pagamento", () => {
    // Arrange
    const conta = new Banco("Conta A", 100);

    // Act
    const saldo = conta.pagarConta(30, "Energia");

    // Assert
    expect(saldo).toBe(70);
    expect(conta.obterHistorico()).toContainEqual({ tipo: "Pagamento", valor: 30, descricao: "Energia" });
  });

  test("deve retornar total depositado somando apenas depositos", () => {
    // Arrange
    const conta = new Banco("Conta A", 0);
    conta.depositar(10);
    conta.depositar(20);
    conta.aplicarJuros(10);

    // Act
    const totalDepositado = conta.obterTotalDepositado();

    // Assert
    expect(totalDepositado).toBe(30);
  });
});
