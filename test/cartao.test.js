const Cartao = require("../src/cartao.js");

describe("Testes da classe Cartao", () => {
  let cartao;

  beforeEach(() => {
    cartao = new Cartao(
      "1234567890123456",
      "ATIVO",
      "Joao Silva",
      "12/30",
      "123",
      "VISA",
      "Banco Teste",
      5000,
      1000,
      "12345-6"
    );
  });

  describe("fazerPagamento", () => {
    test("deve realizar pagamento quando houver saldo suficiente", () => {
      const resultado = cartao.fazerPagamento(200);

      expect(resultado).toBe(800);
      expect(cartao.saldo).toBe(800);
    });

    test("deve permitir pagamento com valor igual ao saldo", () => {
      const resultado = cartao.fazerPagamento(1000);

      expect(resultado).toBe(0);
      expect(cartao.saldo).toBe(0);
    });

    test("deve lançar erro quando não houver saldo suficiente", () => {
      expect(() => cartao.fazerPagamento(1500))
        .toThrow("Saldo insuficiente");

      expect(cartao.saldo).toBe(1000);
    });
  });

  describe("verificarLimiteCartao", () => {
    test("deve retornar true quando valor estiver dentro do limite", () => {
      expect(cartao.verificarLimiteCartao(3000)).toBe(true);
    });

    test("deve aceitar valor igual ao limite", () => {
      expect(cartao.verificarLimiteCartao(5000)).toBe(true);
    });

    test("deve lançar erro quando valor ultrapassar o limite", () => {
      expect(() => cartao.verificarLimiteCartao(6000))
        .toThrow("Valor maior que o limite do cartao");
    });
  });

  describe("consultarSaldo", () => {
    test("deve retornar o saldo atual", () => {
      expect(cartao.consultarSaldo()).toBe(1000);
    });
  });

  describe("consultarLimite", () => {
    test("deve retornar o limite do cartão", () => {
      expect(cartao.consultarLimite()).toBe(5000);
    });
  });

  describe("adicionarSaldo", () => {
    test("deve adicionar saldo corretamente", () => {
      const resultado = cartao.adicionarSaldo(500);

      expect(resultado).toBe(1500);
      expect(cartao.saldo).toBe(1500);
    });

    test("deve lançar erro ao adicionar zero", () => {
      expect(() => cartao.adicionarSaldo(0))
        .toThrow("Valor deve ser maior que zero");
    });

    test("deve lançar erro ao adicionar valor negativo", () => {
      expect(() => cartao.adicionarSaldo(-100))
        .toThrow("Valor deve ser maior que zero");
    });
  });

  describe("possuiSaldo", () => {
    test("deve retornar true quando possuir saldo", () => {
      expect(cartao.possuiSaldo()).toBe(true);
    });

    test("deve retornar false quando saldo for zero", () => {
      cartao.saldo = 0;

      expect(cartao.possuiSaldo()).toBe(false);
    });
  });

  describe("possuiSaldoSuficiente", () => {
    test("deve retornar true quando saldo for suficiente", () => {
      expect(cartao.possuiSaldoSuficiente(500)).toBe(true);
    });

    test("deve retornar true quando valor for igual ao saldo", () => {
      expect(cartao.possuiSaldoSuficiente(1000)).toBe(true);
    });

    test("deve retornar false quando saldo for insuficiente", () => {
      expect(cartao.possuiSaldoSuficiente(1500)).toBe(false);
    });
  });

  describe("bloquearCartao", () => {
    test("deve bloquear o cartão", () => {
      const resultado = cartao.bloquearCartao();

      expect(resultado).toBe("BLOQUEADO");
      expect(cartao.statusCode).toBe("BLOQUEADO");
    });
  });

  describe("desbloquearCartao", () => {
    test("deve desbloquear o cartão", () => {
      cartao.statusCode = "BLOQUEADO";

      const resultado = cartao.desbloquearCartao();

      expect(resultado).toBe("ATIVO");
      expect(cartao.statusCode).toBe("ATIVO");
    });
  });

  describe("estaAtivo", () => {
    test("deve retornar true quando cartão estiver ativo", () => {
      expect(cartao.estaAtivo()).toBe(true);
    });

    test("deve retornar false quando cartão estiver bloqueado", () => {
      cartao.statusCode = "BLOQUEADO";

      expect(cartao.estaAtivo()).toBe(false);
    });
  });

  describe("estaBloqueado", () => {
    test("deve retornar true quando cartão estiver bloqueado", () => {
      cartao.statusCode = "BLOQUEADO";

      expect(cartao.estaBloqueado()).toBe(true);
    });

    test("deve retornar false quando cartão estiver ativo", () => {
      expect(cartao.estaBloqueado()).toBe(false);
    });
  });

  describe("alterarLimite", () => {
    test("deve alterar o limite corretamente", () => {
      const resultado = cartao.alterarLimite(7000);

      expect(resultado).toBe(7000);
      expect(cartao.limiteSaldo).toBe(7000);
    });

    test("deve permitir limite zero", () => {
      expect(cartao.alterarLimite(0)).toBe(0);
    });

    test("deve lançar erro para limite negativo", () => {
      expect(() => cartao.alterarLimite(-500))
        .toThrow("Limite nao pode ser negativo");
    });
  });

  describe("consultarTitular", () => {
    test("deve retornar o nome do titular", () => {
      expect(cartao.consultarTitular()).toBe("Joao Silva");
    });
  });

  describe("alterarTitular", () => {
    test("deve alterar o titular corretamente", () => {
      const resultado = cartao.alterarTitular("Maria Silva");

      expect(resultado).toBe("Maria Silva");
      expect(cartao.nomeTitular).toBe("Maria Silva");
    });

    test("deve lançar erro para nome vazio", () => {
      expect(() => cartao.alterarTitular(""))
        .toThrow("Nome invalido");
    });

    test("deve lançar erro para nome contendo apenas espaços", () => {
      expect(() => cartao.alterarTitular("   "))
        .toThrow("Nome invalido");
    });

    test("deve lançar erro para nome null", () => {
      expect(() => cartao.alterarTitular(null))
        .toThrow("Nome invalido");
    });
  });

  describe("consultarBandeira", () => {
    test("deve retornar a bandeira do cartão", () => {
      expect(cartao.consultarBandeira()).toBe("VISA");
    });
  });

  describe("consultarBancoEmissor", () => {
    test("deve retornar o banco emissor", () => {
      expect(cartao.consultarBancoEmissor()).toBe("Banco Teste");
    });
  });

  describe("verificarCodigoSeguranca", () => {
    test("deve retornar true para código correto", () => {
      expect(cartao.verificarCodigoSeguranca("123")).toBe(true);
    });

    test("deve retornar false para código incorreto", () => {
      expect(cartao.verificarCodigoSeguranca("999")).toBe(false);
    });
  });

  describe("verificarNumeroCartao", () => {
    test("deve retornar true para número correto", () => {
      expect(
        cartao.verificarNumeroCartao("1234567890123456")
      ).toBe(true);
    });

    test("deve retornar false para número incorreto", () => {
      expect(
        cartao.verificarNumeroCartao("9999999999999999")
      ).toBe(false);
    });
  });

  describe("possuiContaVinculada", () => {
    test("deve retornar true quando possuir conta vinculada", () => {
      expect(cartao.possuiContaVinculada()).toBe(true);
    });

    test("deve retornar false quando conta for null", () => {
      cartao.vinculoConta = null;

      expect(cartao.possuiContaVinculada()).toBe(false);
    });

    test("deve retornar false quando conta for undefined", () => {
      cartao.vinculoConta = undefined;

      expect(cartao.possuiContaVinculada()).toBe(false);
    });

    test("deve retornar false quando conta for string vazia", () => {
      cartao.vinculoConta = "";

      expect(cartao.possuiContaVinculada()).toBe(false);
    });
  });

  describe("vincularConta", () => {
    test("deve vincular uma conta corretamente", () => {
      const resultado = cartao.vincularConta("99999-9");

      expect(resultado).toBe("99999-9");
      expect(cartao.vinculoConta).toBe("99999-9");
    });

    test("deve lançar erro ao tentar vincular conta vazia", () => {
      expect(() => cartao.vincularConta(""))
        .toThrow("Conta invalida");
    });

    test("deve lançar erro ao tentar vincular conta null", () => {
      expect(() => cartao.vincularConta(null))
        .toThrow("Conta invalida");
    });
  });
});
