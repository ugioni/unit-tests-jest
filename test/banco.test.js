const Banco = require("../src/banco");

describe("Classe Banco - Método depositar", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco(); 
    banco.saldo = 50;
  });

  test("Depositar o valor alterando o saldo corretamente", async () => {
    const valorDepositado = 50;
  
    const saldoAposDeposito = banco.depositar(valorDepositado);
  
    expect(saldoAposDeposito).toBe(100);
  });
  
  test("Adicionar o depósito na lista de transações", async () => {
    banco.depositar(50);
  
    expect(banco.transacoes).toHaveLength(1);
    expect(banco.transacoes[0]).toEqual({ tipo: 'Depósito', valor: 50 });
  });
});

describe("Classe Banco - Método sacar", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco(); 
    banco.saldo = 50;
  });

  test('Deve lançar um erro ao tentar sacar acima do limite', async () => {
    expect(() => banco.sacar(600)).toThrow('Saldo insuficiente');
  });

  test("Sacar valor válido e atualizar o saldo", async () => {
    const novoSaldo = banco.sacar(20);
    expect(novoSaldo).toBe(30);
    expect(banco.transacoes).toContainEqual({ tipo: 'Saque', valor: 20 });
  });
});

 describe("Classe Banco - Método transferir", () => {
   let devedor;
   let recebedor;

   beforeEach(() => {
    devedor = new Banco(); 
    recebedor = new Banco();

    devedor.saldo = 50;
    recebedor.saldo = 30;
  });

  test("Transferir dinheiro para outra conta", async () => {
    devedor.transferir(10, recebedor);
    expect(devedor.saldo).toBe(40);
    expect(recebedor.saldo).toBe(40);
  })

 })

describe("Classe Banco - Método obterSaldo", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco(); 
    banco.saldo = 50;
  });

  test("Obter saldo atual", async () => {
    expect(banco.obterSaldo()).toBe(50);
  });
});
  
describe("Classe Banco - Método obterHistorico", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco(); 
    banco.saldo = 50;
  });

  test("Obter lista de transações", async () => {
    expect(banco.obterHistorico()).toEqual([]);
  })
});

describe("Classe Banco - Método definirLimiteDeSaque", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco();
  });

  test("Definir limite de saque", async () => {
    banco.definirLimiteDeSaque(50);
    expect(banco.limiteDeSaque).toBe(50);
  })

})

describe("Classe Banco - Método verificarLimiteDeSaque", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco();
    banco.limiteDeSaque = 500;
  });

  test('Deve permitir saque dentro do limite', async () => {
    expect(banco.verificarLimiteDeSaque(300)).toBe(true);
  });

  test('Deve lançar um erro ao verificar que o saldo está acima do limite', async () => {
    expect(() => banco.verificarLimiteDeSaque(600)).toThrow('Saque acima do limite permitido');
  });
});

describe("Classe Banco - Método aplicarJuros", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco();
    banco.saldo = 500;
  });

  test("Aplicar juros ao saldo", async () => {
    banco.aplicarJuros(10);
    expect(banco.saldo).toBe(550);
  })
})

describe("Classe Banco - Método pagarConta", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco();
    banco.saldo = 500;
  });

  test("Adicionar pagamento à lista de transações", async () => {
    banco.pagarConta(50, "Fatura");
  
    expect(banco.transacoes).toHaveLength(2);
    expect(banco.transacoes[0]).toEqual({tipo: 'Saque', valor: 50})
    expect(banco.transacoes[1]).toEqual({ tipo: 'Pagamento', valor: 50 , descricao: "Fatura"});
  })
})

describe("Classe Banco - Método obterTotalDepositado", () => {
  let banco;

  beforeEach(() => {
    banco = new Banco();
  });

  test("Obter o total depositado", async () => {
    banco.depositar(20);
    banco.depositar(35);

    totalDepositado = banco.obterTotalDepositado();

    expect(totalDepositado).toBe(55);
  })
})