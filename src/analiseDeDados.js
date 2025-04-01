class AnaliseDeDados {
    constructor(dados = []) {
      this.dados = dados; // Array numérico para análise estatística
    }
  
    adicionarDados(novosDados) {
      if (!Array.isArray(novosDados)) throw new Error("Os dados devem ser um array.");
      this.dados.push(...novosDados);
    }
  
    limparDados() {
      this.dados = [];
    }
  
    ordenarDados() {
      return [...this.dados].sort((a, b) => a - b);
    }
  
    calcularMedia() {
      if (this.dados.length === 0) return null;
      return this.dados.reduce((sum, num) => sum + num, 0) / this.dados.length;
    }
  
    calcularMediana() {
      if (this.dados.length === 0) return null;
      const ordenado = this.ordenarDados();
      const meio = Math.floor(ordenado.length / 2);
      return ordenado.length % 2 === 0 ? (ordenado[meio - 1] + ordenado[meio]) / 2 : ordenado[meio];
    }
  
    calcularModa() {
      if (this.dados.length === 0) return null;
      const frequencias = this.dados.reduce((freq, num) => {
        freq[num] = (freq[num] || 0) + 1;
        return freq;
      }, {});
  
      const maxFrequencia = Math.max(...Object.values(frequencias));
      return Object.keys(frequencias)
        .filter(num => frequencias[num] === maxFrequencia)
        .map(Number);
    }
  
    calcularVariancia() {
      if (this.dados.length === 0) return null;
      const media = this.calcularMedia();
      return this.dados.reduce((sum, num) => sum + Math.pow(num - media, 2), 0) / this.dados.length;
    }
  
    calcularDesvioPadrao() {
      const variancia = this.calcularVariancia();
      return variancia !== null ? Math.sqrt(variancia) : null;
    }
  
    encontrarMinimo() {
      return this.dados.length ? Math.min(...this.dados) : null;
    }
  
    encontrarMaximo() {
      return this.dados.length ? Math.max(...this.dados) : null;
    }
  
    normalizarDados() {
      const min = this.encontrarMinimo();
      const max = this.encontrarMaximo();
      if (min === max) return this.dados.map(() => 0);
      return this.dados.map(num => (num - min) / (max - min));
    }
  
    calcularPercentil(percentil) {
      if (this.dados.length === 0 || percentil < 0 || percentil > 100) return null;
      const ordenado = this.ordenarDados();
      const index = (percentil / 100) * (ordenado.length - 1);
      const base = Math.floor(index);
      const resto = index - base;
      return resto > 0 ? ordenado[base] + resto * (ordenado[base + 1] - ordenado[base]) : ordenado[base];
    }
  
    calcularSoma() {
      return this.dados.reduce((sum, num) => sum + num, 0);
    }
  
    calcularProduto() {
      return this.dados.reduce((prod, num) => prod * num, 1);
    }
  
    calcularAmplitude() {
      return this.encontrarMaximo() - this.encontrarMinimo();
    }
  
    calcularCoeficienteVariacao() {
      const media = this.calcularMedia();
      const desvio = this.calcularDesvioPadrao();
      return media !== 0 ? (desvio / media) * 100 : null;
    }
  
    removerOutliers(fator = 1.5) {
      const q1 = this.calcularPercentil(25);
      const q3 = this.calcularPercentil(75);
      const iqr = q3 - q1;
      const limiteInferior = q1 - fator * iqr;
      const limiteSuperior = q3 + fator * iqr;
      this.dados = this.dados.filter(num => num >= limiteInferior && num <= limiteSuperior);
    }
  
    calcularCorrelacao(outroConjunto) {
      if (!Array.isArray(outroConjunto) || this.dados.length !== outroConjunto.length) return null;
      
      const mediaX = this.calcularMedia();
      const mediaY = outroConjunto.reduce((sum, num) => sum + num, 0) / outroConjunto.length;
  
      const numerador = this.dados.reduce((sum, x, i) => sum + (x - mediaX) * (outroConjunto[i] - mediaY), 0);
      const denominadorX = Math.sqrt(this.dados.reduce((sum, x) => sum + Math.pow(x - mediaX, 2), 0));
      const denominadorY = Math.sqrt(outroConjunto.reduce((sum, y) => sum + Math.pow(y - mediaY, 2), 0));
  
      return denominadorX * denominadorY !== 0 ? numerador / (denominadorX * denominadorY) : null;
    }
  }

// Exportando a classe para ser usada em outros arquivos ou em testes
module.exports = AnaliseDeDados;
  