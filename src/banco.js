class Banco {
    constructor(nome, saldoInicial = 0) {
        this.nome = nome;
        this.saldo = saldoInicial;
        this.transacoes = [];
    }

    // Método 1: Depositar dinheiro
    depositar(valor) {
        this.saldo += valor;
        this.transacoes.push({ tipo: 'Depósito', valor });
        return this.saldo;
    }

    // Método 2: Sacar dinheiro
    sacar(valor) {
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente');
        }
        this.saldo -= valor;
        this.transacoes.push({ tipo: 'Saque', valor });
        return this.saldo;
    }

    // Método 3: Transferir dinheiro para outra conta
    transferir(valor, contaDestino) {
        this.sacar(valor);
        contaDestino.depositar(valor);
        this.transacoes.push({ tipo: 'Transferência', valor, destino: contaDestino.nome });
    }

    // Método 4: Obter saldo atual
    obterSaldo() {
        return this.saldo;
    }

    // Método 5: Obter histórico de transações
    obterHistorico() {
        return this.transacoes;
    }

    // Método 6: Definir limite de saque
    definirLimiteDeSaque(valorLimite) {
        this.limiteDeSaque = valorLimite;
    }

    // Método 7: Verificar se saque está dentro do limite
    verificarLimiteDeSaque(valor) {
        if (valor > this.limiteDeSaque) {
            throw new Error('Saque acima do limite permitido');
        }
        return true;
    }

    // Método 8: Aplicar juros ao saldo
    aplicarJuros(taxa) {
        const juros = this.saldo * (taxa / 100);
        this.saldo += juros;
        this.transacoes.push({ tipo: 'Juros', valor: juros });
        return this.saldo;
    }

    // Método 9: Pagar uma conta
    pagarConta(valor, descricao) {
        this.sacar(valor);
        this.transacoes.push({ tipo: 'Pagamento', valor, descricao });
        return this.saldo;
    }

    // Método 10: Obter o total depositado
    obterTotalDepositado() {
        return this.transacoes
            .filter(transacao => transacao.tipo === 'Depósito')
            .reduce((total, transacao) => total + transacao.valor, 0);
    }
}

// Exportando a classe para ser usada em outros arquivos ou em testes
module.exports = Banco;
