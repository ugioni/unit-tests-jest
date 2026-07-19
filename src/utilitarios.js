class Utilitarios {
  inverterString(str) {
    return str.split("").reverse().join("");
  }

  contarCaracteres(str) {
    return str.length;
  }

  paraMaiusculas(str) {
    return str.toUpperCase();
  }

  paraMinusculas(str) {
    return str.toLowerCase();
  }

  primeiraLetraMaiuscula(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  somar(a, b) {
    return a + b;
  }

  subtrair(a, b) {
    return a - b;
  }

  multiplicar(a, b) {
    return a * b;
  }

  dividir(a, b) {
    if (b === 0) throw new Error("Divisão por zero");
    return a / b;
  }

  ehPar(num) {
    return num % 2 === 0;
  }

  primeiroElemento(arr) {
    return arr[0];
  }

  ultimoElemento(arr) {
    return arr[arr.length - 1];
  }

  tamanhoArray(arr) {
    return arr.length;
  }

  ordenarArray(arr) {
    return [...arr].sort();
  }

  inverterArray(arr) {
    return [...arr].reverse();
  }

  gerarNumeroAleatorio(max = 100) {
    return Math.floor(Math.random() * max);
  }

  ehNumero(valor) {
    return typeof valor === "number" && !isNaN(valor);
  }

  removerEspacos(str) {
    return str.trim();
  }

  repetirTexto(str, vezes) {
    return str.repeat(vezes);
  }

  juntarArray(arr, separador = ",") {
    return arr.join(separador);
  }

  contarPalavras(str) {
    return str.trim().split(/\s+/).length;
  }

  mediaArray(arr) {
    if (!arr.length) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  removerDuplicados(arr) {
    return [...new Set(arr)];
  }

  ehPalindromo(str) {
    const limpo = str.toLowerCase().replace(/[\W_]/g, "");
    return limpo === limpo.split("").reverse().join("");
  }

  mesclarObjetos(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }
}

module.exports = Utilitarios;
