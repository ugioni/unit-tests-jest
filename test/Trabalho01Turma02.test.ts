import Biblioteca from '../src/Trabalho01Turma02';
import { faker } from '@faker-js/faker';

describe("Biblioteca", () => {
    test("Deve adicionar um livro na biblioteca", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro({ ...livro });
        expect(biblioteca.buscarLivroPorId(1)).toStrictEqual({ ...livro });
    });

    test("Deve remover um livro na biblioteca", () => {
        const bilioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        bilioteca.adicionarLivro({ ...livro });
        bilioteca.removerLivro(1);

        expect(bilioteca.buscarLivroPorId(1)).toBeUndefined();
    });

    test("Deve buscar livro pelo titulo", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro({ ...livro });

        expect(biblioteca.buscarLivroPorTitulo(livro.titulo)[0]).toStrictEqual(livro);
    });

    test("Deve listar livros", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivros()).toEqual([livro, outroLivro]);
    });

    test("Deve adicionar um membro", () => {
        const biblioteca = new Biblioteca();

        const membro = {
            id: 1
        };

        biblioteca.adicionarMembro(membro);

        expect(biblioteca.buscarMembroPorId(1)).toEqual(membro);
    });

    test("Deve remover um membro", () => {
        const biblioteca = new Biblioteca();

        const membro = {
            id: 1
        };

        biblioteca.adicionarMembro(membro);
        biblioteca.removerMembro(1);
        expect(biblioteca.buscarMembroPorId(1)).toBeUndefined();
    });

    test("Deve listar membros", () => {
        const biblioteca = new Biblioteca();

        const membro = {
            id: 1
        };

        const outroMembro = {
            id: 2
        };

        biblioteca.adicionarMembro(membro);
        biblioteca.adicionarMembro(outroMembro);
        expect(biblioteca.listarMembros()).toEqual([membro, outroMembro]);
    });

    test("Deve emprestar livro pois está disponível", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: false,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro({ ...livro });

        const membro = {
            id: 1
        };

        biblioteca.adicionarMembro(membro);

        expect(biblioteca.emprestarLivro(1, 1)).toBeTruthy();

        const livroEmprestado = biblioteca.buscarLivroPorId(1)

        expect(livroEmprestado.emprestado).toBeTruthy();
        expect(livroEmprestado.idMembro).toBe(1);
    });

    test("Nao deve emprestar livro pois não está disponível", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const membro = {
            id: 1
        };

        biblioteca.adicionarMembro(membro);

        const outroMembro = {
            id: 2
        };

        biblioteca.adicionarMembro(outroMembro);

        expect(biblioteca.emprestarLivro(1, 2)).toBeFalsy();

        const livroEmprestado = biblioteca.buscarLivroPorId(1)

        expect(livroEmprestado.emprestado).toBeTruthy();
        expect(livroEmprestado.idMembro).toBe(1);
    });

    test("Deve devolver o livro emprestado", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.devolverLivro(1)).toBeTruthy();

        const livroDevolvido = biblioteca.buscarLivroPorId(1);

        expect(livroDevolvido.emprestado).toBeFalsy();
        expect(livroDevolvido.idMembro).toBeUndefined();
    });

    test("Nao deve devolver o livro pois não está emprestado", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: false,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.devolverLivro(1)).toBeFalsy();

        const livroDevolvido = biblioteca.buscarLivroPorId(1);

        expect(livroDevolvido.emprestado).toBeFalsy();
        expect(livroDevolvido.idMembro).toBeUndefined();
    });

    test("Deve listar livro emprestados", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            titulo: faker.lorem.sentence(),
            emprestado: false,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosEmprestados()).toEqual([livro]);
    });

    test("Deve listar livro emprestados", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            titulo: faker.lorem.sentence(),
            emprestado: false,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosDisponiveis()).toEqual([outroLivro]);
    });

    test("Deve contar os livros", () => {
        const biblioteca = new Biblioteca();

        expect(biblioteca.contarLivros()).toBe(0);

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        expect(biblioteca.contarLivros()).toBe(1);

        biblioteca.removerLivro(1);

        expect(biblioteca.contarLivros()).toBe(0);
    });

    test("Deve contar os membros", () => {
        const biblioteca = new Biblioteca();

        expect(biblioteca.contarMembros()).toBe(0);

        const membro = {
            id: 1
        };

        biblioteca.adicionarMembro(membro);

        expect(biblioteca.contarMembros()).toBe(1);

        biblioteca.removerMembro(1);

        expect(biblioteca.contarMembros()).toBe(0);
    });

    test("Deve listar o livro por autor", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosPorAutor(livro.autor)).toEqual([livro]);
    });

    test("Deve listar o livro por autor", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "sci-fi",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosPorGenero(livro.genero)).toEqual([livro]);
    });

    test("Deve atualizar o livro", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const novoTitulo = faker.lorem.sentence();
        biblioteca.atualizarInformacaoLivro(1, { titulo: novoTitulo })

        expect(biblioteca.buscarLivroPorId(1)).toEqual({ ...livro, titulo: novoTitulo });
    });

    test("Nao deve atualizar um livro que não existe", () => {
        const biblioteca = new Biblioteca();

        const novoTitulo = faker.lorem.sentence();
        biblioteca.atualizarInformacaoLivro(1, { titulo: novoTitulo })

        expect(biblioteca.buscarLivroPorId(1)).toBeUndefined();
    });

    test("Deve listar os livros por ano", () => {
        const biblioteca = new Biblioteca();

        const livro = {
            id: 1,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "fantasia",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(livro);

        const outroLivro = {
            id: 2,
            titulo: faker.lorem.sentence(),
            emprestado: true,
            idMembro: 1,
            autor: faker.person.fullName(),
            genero: "sci-fi",
            ano: faker.date.anytime().getFullYear()
        };

        biblioteca.adicionarLivro(outroLivro);

        expect(biblioteca.listarLivrosPorAno(livro.ano)).toEqual([livro]);
    });
});

// livro
// id number
// titulo string
// emprestado boolean
// idMembro number
// autor: string
// genero: string
// ano: number


// membro
// id
