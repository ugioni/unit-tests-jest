const TextoUtils = require("../src/textoUtils");

const utils = new TextoUtils();

test("Inverter texto", async () => {
  expect(utils.inverter("Texto")).toStrictEqual("otxeT");
});

test("Deve verificar se uma string é palindromo", () => {
    expect(utils.ehPalindromo("ovo")).toBeTruthy();
});

test("Deve deixar a primeira letra maiúscula", () => {

    palavra = "texto"

    palavra = utils.capitalizar(palavra)

    expect(palavra[0]).toStrictEqual("T")
})

test("Deve contar a quantidade de aparições da substring na palavra informada", () => {

    palavra = "Batata";
    substring = "a";

    contagem = utils.contarOcorrencias(palavra, substring);
    
    expect(contagem).toStrictEqual(3);

})