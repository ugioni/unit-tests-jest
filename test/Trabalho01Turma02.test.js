const Biblioteca = require("../src/Trabalho01Turma02");

describe('Biblioteca', () => {
    let biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
    });

    test('Deve adicionar um livro', () => {
        const livro = { id: 1, titulo: "O Senhor dos Anéis" };
        biblioteca.adicionarLivro(livro);
        expect(biblioteca.livros).toContain(livro);
    });

    test('Deve remover um livro', () => {
        const livro = { id: 1, titulo: "O Senhor dos Anéis" };
        biblioteca.adicionarLivro(livro);
        biblioteca.removerLivro(1);
        expect(biblioteca.livros).not.toContain(livro);
    });

    test('Deve buscar um livro por ID', () => {
        const livro = { id: 1, titulo: "O Senhor dos Anéis" };
        biblioteca.adicionarLivro(livro);
        const resultado = biblioteca.buscarLivroPorId(1);
        expect(resultado).toBe(livro);
    });

});
