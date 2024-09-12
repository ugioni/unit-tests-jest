type Transacao = {
    tipo: string;
    valor: number;
    destino?: string;
    descricao?: string;
}

export default class Banco {
    private nome: string;
    private saldo: number;
    private transacoes: Transacao[];
    private limiteDeSaque?: number;

    constructor(nome: string, saldoInicial = 0) {
        this.nome = nome;
        this.saldo = saldoInicial;
        this.transacoes = [];
    }

    // Método 1: Depositar dinheiro
    depositar(valor: number) {
        this.saldo += valor;
        this.transacoes.push({ tipo: 'Depósito', valor });
        return this.saldo;
    }

    // Método 2: Sacar dinheiro
    sacar(valor: number) {
        if (valor > this.saldo) {
            throw new Error('Saldo insuficiente');
        }
        this.saldo -= valor;
        this.transacoes.push({ tipo: 'Saque', valor });
        return this.saldo;
    }

    // Método 3: Transferir dinheiro para outra conta
    transferir(valor: number, contaDestino: Banco) {
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
    definirLimiteDeSaque(valorLimite: number) {
        this.limiteDeSaque = valorLimite;
    }

    // Método 7: Verificar se saque está dentro do limite
    verificarLimiteDeSaque(valor: number) {
        if (valor > this.limiteDeSaque!) {
            throw new Error('Saque acima do limite permitido');
        }
        return true;
    }

    // Método 8: Aplicar juros ao saldo
    aplicarJuros(taxa: number) {
        const juros = this.saldo * (taxa / 100);
        this.saldo += juros;
        this.transacoes.push({ tipo: 'Juros', valor: juros });
        return this.saldo;
    }

    // Método 9: Pagar uma conta
    pagarConta(valor: number, descricao: string) {
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

