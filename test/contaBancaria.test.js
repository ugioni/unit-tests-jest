const ContaBancaria = require("../src/contaBancaria");

const criarContaBase = () => ({
  id: "1",
  titular: "Maria",
  saldo: 100,
  limite: 50,
  status: "ativa",
  atualizadaEm: new Date("2024-01-01T00:00:00.000Z"),
});

describe("conta bancaria", () => {
  test("deve retornar dados basicos da conta", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const saldo = conta.obterSaldo();
    const titular = conta.obterTitular();
    const status = conta.obterStatus();
    const limite = conta.obterLimite();
    const ativa = conta.estaAtiva();

    // Assert
    expect(saldo).toBe(100);
    expect(titular).toBe("Maria");
    expect(status).toBe("ativa");
    expect(limite).toBe(50);
    expect(ativa).toBe(true);
  });

  test("deve depositar com valor valido e rejeitar valor invalido", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const depositoInvalido = conta.depositar(0);
    const depositoValido = conta.depositar(25);

    // Assert
    expect(depositoInvalido).toBe(false);
    expect(depositoValido).toBe(true);
    expect(conta.obterSaldo()).toBe(125);
  });

  test("deve sacar quando ha saldo disponivel e rejeitar cenarios invalidos", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const saqueInvalido = conta.sacar(0);
    const saqueMaiorQueDisponivel = conta.sacar(1000);
    const saqueValido = conta.sacar(120);

    // Assert
    expect(saqueInvalido).toBe(false);
    expect(saqueMaiorQueDisponivel).toBe(false);
    expect(saqueValido).toBe(true);
    expect(conta.obterSaldo()).toBe(-20);
  });

  test("deve alterar titular e controlar bloqueio/ativacao", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const titularInvalido = conta.alterarTitular("");
    const titularValido = conta.alterarTitular("Joao");
    const bloqueio = conta.bloquearConta();
    const bloqueioRepetido = conta.bloquearConta();
    const ativacao = conta.ativarConta();
    const ativacaoRepetida = conta.ativarConta();

    // Assert
    expect(titularInvalido).toBe(false);
    expect(titularValido).toBe(true);
    expect(conta.obterTitular()).toBe("Joao");
    expect(bloqueio).toBe(true);
    expect(bloqueioRepetido).toBe(false);
    expect(ativacao).toBe(true);
    expect(ativacaoRepetida).toBe(false);
  });

  test("deve encerrar conta somente quando saldo for zero", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const encerraComSaldo = conta.encerrarConta();
    conta.sacar(100);
    const encerraSemSaldo = conta.encerrarConta();

    // Assert
    expect(encerraComSaldo).toBe(false);
    expect(encerraSemSaldo).toBe(true);
    expect(conta.obterStatus()).toBe("encerrada");
  });

  test("deve avaliar possibilidade de saque e saldo negativo", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const podeSacarValido = conta.podeSacar(149);
    const podeSacarInvalido = conta.podeSacar(151);
    conta.sacar(120);
    const saldoNegativo = conta.saldoNegativo();

    // Assert
    expect(podeSacarValido).toBe(true);
    expect(podeSacarInvalido).toBe(false);
    expect(saldoNegativo).toBe(true);
  });

  test("deve aplicar tarifa, ajustar limite e calcular saldo disponivel", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const tarifaInvalida = conta.aplicarTarifa(0);
    const tarifaValida = conta.aplicarTarifa(10);
    const limiteInvalido = conta.ajustarLimite(-1);
    const limiteValido = conta.ajustarLimite(100);
    const disponivel = conta.calcularSaldoDisponivel();

    // Assert
    expect(tarifaInvalida).toBe(false);
    expect(tarifaValida).toBe(true);
    expect(limiteInvalido).toBe(false);
    expect(limiteValido).toBe(true);
    expect(disponivel).toBe(190);
  });

  test("deve transferir para conta destino quando pode sacar", () => {
    // Arrange
    const origem = new ContaBancaria(criarContaBase());
    const destino = { depositar: jest.fn() };

    // Act
    const sucesso = origem.transferir(50, destino);

    // Assert
    expect(sucesso).toBe(true);
    expect(destino.depositar).toHaveBeenCalledWith(50);
    expect(origem.obterSaldo()).toBe(50);
  });

  test("deve falhar transferencia quando saque nao e permitido", () => {
    // Arrange
    const origem = new ContaBancaria(criarContaBase());
    const destino = { depositar: jest.fn() };

    // Act
    const sucesso = origem.transferir(1000, destino);

    // Assert
    expect(sucesso).toBe(false);
    expect(destino.depositar).not.toHaveBeenCalled();
  });

  test("deve gerar resumo da conta", () => {
    // Arrange
    const conta = new ContaBancaria(criarContaBase());

    // Act
    const resumo = conta.gerarResumo();

    // Assert
    expect(resumo).toEqual({
      titular: "Maria",
      saldo: 100,
      limite: 50,
      disponivel: 150,
      status: "ativa",
    });
  });

  test("deve validar conta para cenarios valido e invalidos", () => {
    // Arrange
    const valida = new ContaBancaria(criarContaBase());
    const semId = new ContaBancaria({ ...criarContaBase(), id: "" });
    const statusInvalido = new ContaBancaria({ ...criarContaBase(), status: "suspensa" });

    // Act
    const contaValida = valida.validarConta();
    const contaSemId = semId.validarConta();
    const contaComStatusInvalido = statusInvalido.validarConta();

    // Assert
    expect(contaValida).toBe(true);
    expect(contaSemId).toBe(false);
    expect(contaComStatusInvalido).toBe(false);
  });

  test("deve resetar conta para estado inicial padrao", () => {
    // Arrange
    const conta = new ContaBancaria({
      ...criarContaBase(),
      saldo: 999,
      limite: 300,
      status: "bloqueada",
    });

    // Act
    conta.resetarConta();

    // Assert
    expect(conta.obterSaldo()).toBe(0);
    expect(conta.obterLimite()).toBe(0);
    expect(conta.obterStatus()).toBe("ativa");
  });
});
