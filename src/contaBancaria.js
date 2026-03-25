class ContaBancaria {
  constructor(conta) {
    this.conta = conta;
  }

  obterSaldo() {
    return this.conta.saldo;
  }

  obterTitular() {
    return this.conta.titular;
  }

  obterStatus() {
    return this.conta.status;
  }

  estaAtiva() {
    return this.conta.status === "ativa";
  }

  obterLimite() {
    return this.conta.limite;
  }

  depositar(valor) {
    if (valor <= 0) return false;

    this.conta.saldo += valor;
    this.conta.atualizadaEm = new Date();
    return true;
  }

  sacar(valor) {
    if (valor <= 0) return false;

    const saldoDisponivel = this.conta.saldo + this.conta.limite;

    if (valor > saldoDisponivel) return false;

    this.conta.saldo -= valor;
    this.conta.atualizadaEm = new Date();
    return true;
  }

  alterarTitular(novoTitular) {
    if (!novoTitular) return false;

    this.conta.titular = novoTitular;
    return true;
  }

  bloquearConta() {
    if (this.conta.status === "bloqueada") return false;

    this.conta.status = "bloqueada";
    return true;
  }

  ativarConta() {
    if (this.conta.status === "ativa") return false;

    this.conta.status = "ativa";
    return true;
  }

  encerrarConta() {
    if (this.conta.saldo !== 0) return false;

    this.conta.status = "encerrada";
    return true;
  }

  podeSacar(valor) {
    const saldoDisponivel = this.conta.saldo + this.conta.limite;
    return valor > 0 && valor <= saldoDisponivel;
  }

  aplicarTarifa(valor) {
    if (valor <= 0) return false;

    this.conta.saldo -= valor;
    return true;
  }

  ajustarLimite(novoLimite) {
    if (novoLimite < 0) return false;

    this.conta.limite = novoLimite;
    return true;
  }

  saldoNegativo() {
    return this.conta.saldo < 0;
  }

  transferir(valor, contaDestino) {
    if (!this.podeSacar(valor)) return false;

    const sucessoSaque = this.sacar(valor);
    if (!sucessoSaque) return false;

    contaDestino.depositar(valor);
    return true;
  }

  calcularSaldoDisponivel() {
    return this.conta.saldo + this.conta.limite;
  }

  gerarResumo() {
    return {
      titular: this.conta.titular,
      saldo: this.conta.saldo,
      limite: this.conta.limite,
      disponivel: this.calcularSaldoDisponivel(),
      status: this.conta.status,
    };
  }

  validarConta() {
    if (!this.conta.id) return false;
    if (!this.conta.titular) return false;
    if (typeof this.conta.saldo !== "number") return false;
    if (this.conta.limite < 0) return false;
    if (!["ativa", "bloqueada", "encerrada"].includes(this.conta.status)) {
      return false;
    }

    return true;
  }

  resetarConta() {
    this.conta.saldo = 0;
    this.conta.limite = 0;
    this.conta.status = "ativa";
    this.conta.atualizadaEm = new Date();
  }
}

module.exports = ContaBancaria;
