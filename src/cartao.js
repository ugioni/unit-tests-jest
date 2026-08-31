class Cartao {
  constructor(
    numCartao,
    statusCode,
    nomeTitular,
    dataValidade,
    codigoSeguranca,
    bandeira,
    bancoEmissor,
    limiteSaldo,
    saldo,
    vinculoConta
  ) {
    this.numCartao = numCartao;
    this.statusCode = statusCode;
    this.nomeTitular = nomeTitular;
    this.dataValidade = dataValidade;
    this.codigoSeguranca = codigoSeguranca;
    this.bandeira = bandeira;
    this.bancoEmissor = bancoEmissor;
    this.limiteSaldo = limiteSaldo;
    this.saldo = saldo;
    this.vinculoConta = vinculoConta;
  }

  fazerPagamento(valor) {
    const saldoResultante = this.saldo - valor;

    if (saldoResultante < 0) {
      throw new Error("Saldo insuficiente");
    }

    this.saldo = saldoResultante;
    return this.saldo;
  }

  verificarLimiteCartao(valor) {
    if (valor > this.limiteSaldo) {
      throw new Error("Valor maior que o limite do cartao");
    }

    return true;
  }

  consultarSaldo() {
    return this.saldo;
  }

  consultarLimite() {
    return this.limiteSaldo;
  }

  adicionarSaldo(valor) {
    if (valor <= 0) {
      throw new Error("Valor deve ser maior que zero");
    }

    this.saldo += valor;
    return this.saldo;
  }

  possuiSaldo() {
    return this.saldo > 0;
  }

  possuiSaldoSuficiente(valor) {
    return this.saldo >= valor;
  }

  bloquearCartao() {
    this.statusCode = "BLOQUEADO";
    return this.statusCode;
  }

  desbloquearCartao() {
    this.statusCode = "ATIVO";
    return this.statusCode;
  }

  estaAtivo() {
    return this.statusCode === "ATIVO";
  }

  estaBloqueado() {
    return this.statusCode === "BLOQUEADO";
  }

  alterarLimite(novoLimite) {
    if (novoLimite < 0) {
      throw new Error("Limite nao pode ser negativo");
    }

    this.limiteSaldo = novoLimite;
    return this.limiteSaldo;
  }

  consultarTitular() {
    return this.nomeTitular;
  }

  alterarTitular(novoNome) {
    if (!novoNome || novoNome.trim() === "") {
      throw new Error("Nome invalido");
    }

    this.nomeTitular = novoNome;
    return this.nomeTitular;
  }

  consultarBandeira() {
    return this.bandeira;
  }

  consultarBancoEmissor() {
    return this.bancoEmissor;
  }

  verificarCodigoSeguranca(codigo) {
    return this.codigoSeguranca === codigo;
  }

  verificarNumeroCartao(numero) {
    return this.numCartao === numero;
  }

  possuiContaVinculada() {
    return this.vinculoConta !== null &&
           this.vinculoConta !== undefined &&
           this.vinculoConta !== "";
  }

  vincularConta(conta) {
    if (!conta) {
      throw new Error("Conta invalida");
    }

    this.vinculoConta = conta;
    return this.vinculoConta;
  }
}

module.exports = Cartao;
