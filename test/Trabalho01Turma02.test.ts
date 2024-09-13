import Biblioteca from '../src/Trabalho01Turma02';
import { faker } from '@faker-js/faker';

describe("Biblioteca", () => {
    let biblioteca: Biblioteca;

    beforeEach(() => {
        biblioteca = new Biblioteca();
    })

    test("Deve adicionar um livro", () => {
        const livro = { id: 1 };

        biblioteca.adicionarLivro(livro);
        expect(biblioteca.buscarLivroPorId(1)).toEqual(livro);
    });

    test("Deve remover um livro", () => {
        const livro = { id: 1 };

        biblioteca.adicionarLivro(livro);
        biblioteca.removerLivro(1);

        expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
    });

    test("Deve buscar livro pelo titulo", () => {
        const livro = { 
            id: 1, titulo: 
            faker.lorem.sentence() 
        };

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.buscarLivroPorTitulo(livro.titulo)[0]).toEqual(livro);
    });

    test("Deve listar os livros", () => {
        const livro = { id: 1 };

        biblioteca.adicionarLivro(livro);

        const outroLivro = { id: 2 };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivros()).toEqual([livro, outroLivro]);
    });

    test("Deve adicionar um membro", () => {
        const membro = { id: 1 };

        biblioteca.adicionarMembro(membro);

        expect(biblioteca.buscarMembroPorId(1)).toEqual(membro);
    });

    test("Deve remover um membro", () => {
        const membro = { id: 1 };

        biblioteca.adicionarMembro(membro);
        biblioteca.removerMembro(1);
        expect(biblioteca.buscarMembroPorId(1)).toBeUndefined();
    });

    test("Deve listar os membros", () => {
        const membro = { id: 1 };
        const outroMembro = { id: 2 };

        biblioteca.adicionarMembro(membro);
        biblioteca.adicionarMembro(outroMembro);
        expect(biblioteca.listarMembros()).toEqual([membro, outroMembro]);
    });

    test("Deve emprestar livro pois está disponível", () => {
        const livro = {
            id: 1,
            emprestado: false
        };

        biblioteca.adicionarLivro(livro);

        const membro = {
            id: 1
        };

        biblioteca.adicionarMembro(membro);

        expect(biblioteca.emprestarLivro(1, 1)).toBeTruthy();

        const livroEmprestado = biblioteca.buscarLivroPorId(1)

        expect(livroEmprestado.emprestado).toBeTruthy();
        expect(livroEmprestado.idMembro).toBe(1);
    });

    test("Não deve emprestar o livro pois não está disponível", () => {
        const livro = {
            id: 1,
            emprestado: true,
            idMembro: 1
        };

        biblioteca.adicionarLivro(livro);

        const membro = { id: 1 };

        biblioteca.adicionarMembro(membro);

        const outroMembro = { id: 2 };

        biblioteca.adicionarMembro(outroMembro);

        expect(biblioteca.emprestarLivro(1, 2)).toBeFalsy();

        const livroEmprestado = biblioteca.buscarLivroPorId(1)

        expect(livroEmprestado.emprestado).toBeTruthy();
        expect(livroEmprestado.idMembro).toBe(1);
    });

    test("Deve devolver o livro emprestado", () => {
        const livro = {
            id: 1,
            emprestado: true,
            idMembro: 1
        };

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.devolverLivro(1)).toBeTruthy();

        const livroDevolvido = biblioteca.buscarLivroPorId(1);

        expect(livroDevolvido.emprestado).toBeFalsy();
        expect(livroDevolvido.idMembro).toBeUndefined();
    });

    test("Não deve devolver o livro pois não está emprestado", () => {
        const livro = {
            id: 1,
            emprestado: false
        };

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.devolverLivro(1)).toBeFalsy();

        const livroDevolvido = biblioteca.buscarLivroPorId(1);

        expect(livroDevolvido.emprestado).toBeFalsy();
        expect(livroDevolvido.idMembro).toBeUndefined();
    });

    test("Deve listar os livros emprestados", () => {
        const livro = {
            id: 1,
            emprestado: true
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            emprestado: false
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosEmprestados()).toEqual([livro]);
    });

    test("Deve listar os livros disponíveis", () => {
        const livro = {
            id: 1,
            emprestado: true
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            emprestado: false
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosDisponiveis()).toEqual([outroLivro]);
    });

    test("Deve contar os livros", () => {
        expect(biblioteca.contarLivros()).toBe(0);

        const livro = { id: 1 };

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.contarLivros()).toBe(1);

        biblioteca.removerLivro(1);

        expect(biblioteca.contarLivros()).toBe(0);
    });

    test("Deve contar os membros", () => {
        expect(biblioteca.contarMembros()).toBe(0);

        const membro = { id: 1 };

        biblioteca.adicionarMembro(membro);

        expect(biblioteca.contarMembros()).toBe(1);

        biblioteca.removerMembro(1);

        expect(biblioteca.contarMembros()).toBe(0);
    });

    test("Deve listar o livro por autor", () => {
        const livro = {
            id: 1,
            autor: faker.person.fullName()
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            autor: faker.person.fullName()
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosPorAutor(livro.autor)).toEqual([livro]);
    });

    test("Deve listar o livro por genero", () => {
        const livro = {
            id: 1,
            genero: "fantasia"
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            genero: "sci-fi"
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosPorGenero(livro.genero)).toEqual([livro]);
    });

    test("Deve atualizar o livro", () => {
        const livro = {
            id: 1,
            titulo: faker.lorem.sentence()
        };

        biblioteca.adicionarLivro(livro);

        const novoTitulo = faker.lorem.sentence();
        biblioteca.atualizarInformacaoLivro(1, { titulo: novoTitulo })

        expect(biblioteca.buscarLivroPorId(1)).toEqual({ ...livro, titulo: novoTitulo });
    });

    test("Não deve atualizar um livro que não existe", () => {
        const novoTitulo = faker.lorem.sentence();
        biblioteca.atualizarInformacaoLivro(1, { titulo: novoTitulo })

        expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
    });

    test("Deve listar os livros por ano", () => {
        const livro = {
            id: 1,
            ano: 2020
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            ano: 2021
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosPorAno(livro.ano)).toEqual([livro]);
    });
});