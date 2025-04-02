const AnaliseDeDados = require("../src/analiseDeDados");

describe('AnaliseDeDados', () => {
    let analise;
  
    beforeEach(() => {
      analise = new AnaliseDeDados([10, 20, 30, 40, 50]);
    });
  
    test('Deve calcular a média corretamente', () => {
      expect(analise.calcularMedia()).toBe(30);
    });
  
    test('Deve calcular a mediana corretamente', () => {
      expect(analise.calcularMediana()).toBe(30);
    });
  
    test('Deve calcular a moda corretamente', () => {
      analise.adicionarDados([20, 20, 40, 40]);
      expect(analise.calcularModa()).toEqual([20, 40]);
    });
  
    test('Deve calcular a variância corretamente', () => {
      expect(analise.calcularVariancia()).toBe(200);
    });
  
    test('Deve calcular o desvio padrão corretamente', () => {
      expect(analise.calcularDesvioPadrao()).toBeCloseTo(14.14, 2);
    });     
  });
  