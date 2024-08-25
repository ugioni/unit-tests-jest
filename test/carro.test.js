const Carro = require('../src/carro');

describe('Testes da classe Carro', () => {
    let carro;

    beforeEach(() => {
        carro = new Carro('Toyota', 'Corolla', 2020);
    });

    test('Deve criar um carro com a marca, modelo e ano corretos', () => {
        expect(carro.marca).toBe('Toyota');
        expect(carro.modelo).toBe('Corolla');
        expect(carro.ano).toBe(2020);
        expect(carro.kilometragem).toBe(0);
    });

    test('Deve dirigir o carro e aumentar a quilometragem corretamente', () => {
        carro.dirigir(100);
        expect(carro.kilometragem).toBe(100);
    });

    test('Não deve alterar a quilometragem se a distância for negativa', () => {
        carro.dirigir(-50);
        expect(carro.kilometragem).toBe(0);
    });

    test('Deve retornar as informações corretas do carro', () => {
        const info = carro.obterInfo();
        expect(info).toBe('Toyota Corolla, Ano: 2020, Quilometragem: 0 km');
    });

    test('Deve retornar as informações corretas após dirigir', () => {
        carro.dirigir(150);
        const info = carro.obterInfo();
        expect(info).toBe('Toyota Corolla, Ano: 2020, Quilometragem: 150 km');
    });
});
