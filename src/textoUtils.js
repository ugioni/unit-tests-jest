class TextoUtils {
  /** Inverte uma string */
  inverter(texto) {
    return texto.split("").reverse().join("");
  }

  /** Verifica se uma string é um palíndromo (ignorando espaços e caixa) */
  ehPalindromo(texto) {
    const limpo = texto.toLowerCase().replace(/[^a-z0-9]/g, "");
    return limpo === limpo.split("").reverse().join("");
  }

  /** Deixa a primeira letra de cada palavra maiúscula */
  capitalizar(texto) {
    return texto
      .split(" ")
      .map((palavra) =>
        palavra.length === 0
          ? palavra
          : palavra[0].toUpperCase() + palavra.slice(1).toLowerCase(),
      )
      .join(" ");
  }

  /** Conta quantas vezes uma substring aparece no texto */
  contarOcorrencias(texto, substring) {
    if (!substring) return 0;
    return texto.split(substring).length - 1;
  }

  /** Remove espaços em branco extras (início, fim e entre palavras) */
  removerEspacosExtras(texto) {
    return texto.trim().replace(/\s+/g, " ");
  }

  /** Converte uma string para slug (ex: "Olá Mundo!" -> "ola-mundo") */
  paraSlug(texto) {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  /** Trunca o texto até um tamanho máximo, adicionando "..." se necessário */
  truncar(texto, tamanho) {
    if (tamanho < 0) {
      throw new Error("O tamanho não pode ser negativo");
    }
    if (texto.length <= tamanho) return texto;
    return texto.slice(0, tamanho) + "...";
  }

  /** Conta o número de palavras em um texto */
  contarPalavras(texto) {
    const palavras = texto.trim().split(/\s+/).filter(Boolean);
    return palavras.length;
  }

  /** Verifica se uma string contém apenas letras */
  somenteLetras(texto) {
    return /^[a-zA-ZÀ-ÿ]+$/.test(texto);
  }

  /** Troca todas as ocorrências de uma substring por outra */
  substituirTudo(texto, alvo, substituto) {
    if (!alvo) {
      throw new Error("O alvo não pode ser vazio");
    }
    return texto.split(alvo).join(substituto);
  }
}

module.exports = TextoUtils;
