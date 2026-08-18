const TextoUtils = require("../src/textoUtils")

describe("Testando a função ehPalindromo", () => {

  beforeEach(() => {
    utils = new TextoUtils()
  })

  test("com um palindromo", () => {
    //Arrange
    const palavra = "arara"

    // Act
    var isPalindromo = utils.ehPalindromo(palavra)

    // Assert
    expect(isPalindromo).toBe(true)
  });

  test("sem ser um palindromo", () => {
    //Arrange
    const palavra = "Ornintorrinco"

    // Act
    var isPalindromo = utils.ehPalindromo(palavra)

    // Assertm
    expect(isPalindromo).toBe(false)
  });

  test("Letra Maiuscula importa?", () => {
    //Arrange
    const palavra = "Arara"

    // Act
    var isPalindromo = utils.ehPalindromo(palavra)

    // Assert
    expect(isPalindromo).toBe(true)
  });
})

describe("Testando a função capitalizar", () => {
  test("Primeira letra maiuscula", () => {
    const palavra = "Mais"

    var palavraNova = utils.capitalizar(palavra)

    expect(palavra).toBe(palavraNova)
  })

  test("Começa com uma letra nao legivel a letra maiuscula", () => {
    const palavra = "+"

    var palavraNova = utils.capitalizar(palavra)

    expect(palavra).toBe(palavraNova)
  })

  test("Primeira letra maiuscula", () => {
    const palavra = "masculO"

    var palavraNova = utils.capitalizar(palavra)

    expect(palavraNova).toBe("Masculo")
  })

  describe("Contar Palavras", () => {
    test("Caso correto", () => {
      const palavras = "sdasd- dasdas dasdasd asdasd dasdad asdasd asdasd -das. das."

      var palavraContada = utils.contarPalavras(palavras)

      expect(palavraContada).toBe(9)
    })
  })


})
