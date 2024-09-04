const Banco = require("../src/banco");

describe('Testes da classe Banco', () => {
    let conta;

    beforeEach(() => {
        contaZerada = new Banco('Conta Zerada');
        contaSaldo = new Banco('Conta Com Saldo', 10);
    });

    test('Deve depositar dinheiro corretamente', () => {
        contaSaldo.depositar(7.7);
        expect(contaSaldo.obterSaldo()).toBe(17.7);
    });

    test('Deve sacar dinheiro corretamente', () => {
        contaSaldo.sacar(5);
        expect(contaSaldo.obterSaldo()).toBe(5);
    });

    test('Deve transferir dinheiro corretamente', () => {
        contaSaldo.transferir(3, contaZerada);
        expect(contaZerada.obterSaldo()).toBe(3);
        expect(contaSaldo.obterSaldo()).toBe(7);
    });

    test('Deve validar saque sem saldo', () => {
        expect(() => {
            contaSaldo.sacar(15);
        }).toThrow('Saldo insuficiente');
    });

});