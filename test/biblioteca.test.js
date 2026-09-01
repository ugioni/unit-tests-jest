const Biblioteca = require("../src/biblioteca");

describe("Biblioteca", () => {
  let biblioteca;

  const livro1 = {
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Romance",
    ano: 1899
  };

  const livro2 = {
    titulo: "O Hobbit",
    autor: "J. R. R. Tolkien",
    categoria: "Fantasia",
    ano: 1937
  };

  const livro3 = {
    titulo: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    categoria: "Romance",
    ano: 1881
  };

  beforeEach(() => {
    biblioteca = new Biblioteca();
  });

  describe("adicionarLivro", () => {
    test("deve adicionar um livro como disponível", () => {
      const resultado = biblioteca.adicionarLivro(livro1);

      expect(resultado).toBe(true);
      expect(biblioteca.livros).toEqual([
        {
          ...livro1,
          disponivel: true
        }
      ]);
    });

    test("deve lançar erro quando o livro for nulo", () => {
      expect(() => biblioteca.adicionarLivro(null))
        .toThrow("Livro inválido");
    });

    test("deve lançar erro quando o título não for informado", () => {
      expect(() => {
        biblioteca.adicionarLivro({
          autor: "Machado de Assis"
        });
      }).toThrow("Livro inválido");
    });

    test("deve lançar erro quando o autor não for informado", () => {
      expect(() => {
        biblioteca.adicionarLivro({
          titulo: "Dom Casmurro"
        });
      }).toThrow("Livro inválido");
    });
  });

  describe("removerLivro", () => {
    test("deve remover um livro existente", () => {
      biblioteca.adicionarLivro(livro1);

      const resultado = biblioteca.removerLivro("Dom Casmurro");

      expect(resultado).toBe(true);
      expect(biblioteca.livros).toHaveLength(0);
    });

    test("deve retornar false quando o livro não existir", () => {
      const resultado = biblioteca.removerLivro("Livro inexistente");

      expect(resultado).toBe(false);
    });
  });

  describe("buscarLivro", () => {
    test("deve encontrar um livro ignorando maiúsculas e minúsculas", () => {
      biblioteca.adicionarLivro(livro1);

      const resultado = biblioteca.buscarLivro("DOM CASMURRO");

      expect(resultado).toEqual({
        ...livro1,
        disponivel: true
      });
    });

    test("deve retornar null quando o livro não existir", () => {
      const resultado = biblioteca.buscarLivro("Livro inexistente");

      expect(resultado).toBeNull();
    });
  });

  describe("buscarPorAutor", () => {
    test("deve retornar os livros do autor informado", () => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.adicionarLivro(livro2);
      biblioteca.adicionarLivro(livro3);

      const resultado =
        biblioteca.buscarPorAutor("MACHADO DE ASSIS");

      expect(resultado).toHaveLength(2);
      expect(resultado[0].titulo).toBe("Dom Casmurro");
      expect(resultado[1].titulo)
        .toBe("Memórias Póstumas de Brás Cubas");
    });

    test("deve retornar uma lista vazia quando o autor não existir", () => {
      biblioteca.adicionarLivro(livro1);

      const resultado = biblioteca.buscarPorAutor("Autor desconhecido");

      expect(resultado).toEqual([]);
    });
  });

  describe("listagem e quantidade de livros", () => {
    beforeEach(() => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.adicionarLivro(livro2);
      biblioteca.emprestarLivro("O Hobbit", "João");
    });

    test("deve listar somente os livros disponíveis", () => {
      const resultado = biblioteca.listarLivrosDisponiveis();

      expect(resultado).toHaveLength(1);
      expect(resultado[0].titulo).toBe("Dom Casmurro");
    });

    test("deve listar somente os livros indisponíveis", () => {
      const resultado = biblioteca.listarLivrosIndisponiveis();

      expect(resultado).toHaveLength(1);
      expect(resultado[0].titulo).toBe("O Hobbit");
    });

    test("deve retornar a quantidade total de livros", () => {
      expect(biblioteca.quantidadeLivros()).toBe(2);
    });

    test("deve retornar a quantidade de livros disponíveis", () => {
      expect(biblioteca.quantidadeDisponiveis()).toBe(1);
    });

    test("deve retornar a quantidade de livros indisponíveis", () => {
      expect(biblioteca.quantidadeIndisponiveis()).toBe(1);
    });
  });

  describe("emprestarLivro", () => {
    beforeEach(() => {
      biblioteca.adicionarLivro(livro1);
    });

    test("deve emprestar um livro disponível", () => {
      const resultado =
        biblioteca.emprestarLivro("Dom Casmurro", "João");

      expect(resultado).toBe(true);
      expect(biblioteca.estaDisponivel("Dom Casmurro")).toBe(false);
    });

    test("deve registrar o empréstimo no histórico", () => {
      biblioteca.emprestarLivro("Dom Casmurro", "João");

      expect(biblioteca.emprestimos).toHaveLength(1);
      expect(biblioteca.emprestimos[0]).toEqual({
        tituloLivro: "Dom Casmurro",
        usuario: "João",
        data: expect.any(Date)
      });
    });

    test("deve lançar erro quando o livro não existir", () => {
      expect(() => {
        biblioteca.emprestarLivro("O Hobbit", "João");
      }).toThrow("Livro não encontrado");
    });

    test("deve lançar erro quando o livro estiver indisponível", () => {
      biblioteca.emprestarLivro("Dom Casmurro", "João");

      expect(() => {
        biblioteca.emprestarLivro("Dom Casmurro", "Maria");
      }).toThrow("Livro indisponível");
    });
  });

  describe("devolverLivro", () => {
    beforeEach(() => {
      biblioteca.adicionarLivro(livro1);
    });

    test("deve devolver um livro emprestado", () => {
      biblioteca.emprestarLivro("Dom Casmurro", "João");

      const resultado = biblioteca.devolverLivro("Dom Casmurro");

      expect(resultado).toBe(true);
      expect(biblioteca.estaDisponivel("Dom Casmurro")).toBe(true);
    });

    test("deve lançar erro quando o livro não existir", () => {
      expect(() => {
        biblioteca.devolverLivro("O Hobbit");
      }).toThrow("Livro não encontrado");
    });

    test("deve lançar erro quando o livro já estiver disponível", () => {
      expect(() => {
        biblioteca.devolverLivro("Dom Casmurro");
      }).toThrow("Livro já está disponível");
    });
  });

  describe("estaDisponivel", () => {
    test("deve retornar true quando o livro estiver disponível", () => {
      biblioteca.adicionarLivro(livro1);

      expect(biblioteca.estaDisponivel("Dom Casmurro")).toBe(true);
    });

    test("deve retornar false quando o livro estiver emprestado", () => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.emprestarLivro("Dom Casmurro", "João");

      expect(biblioteca.estaDisponivel("Dom Casmurro")).toBe(false);
    });

    test("deve retornar false quando o livro não existir", () => {
      expect(biblioteca.estaDisponivel("Livro inexistente")).toBe(false);
    });
  });

  describe("categorias", () => {
    beforeEach(() => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.adicionarLivro(livro2);
      biblioteca.adicionarLivro(livro3);
    });

    test("deve buscar livros por categoria", () => {
      const resultado =
        biblioteca.buscarPorCategoria("ROMANCE");

      expect(resultado).toHaveLength(2);
    });

    test("deve contar os livros de uma categoria", () => {
      expect(biblioteca.contarPorCategoria("Romance")).toBe(2);
      expect(biblioteca.contarPorCategoria("Fantasia")).toBe(1);
    });

    test("deve retornar zero para uma categoria inexistente", () => {
      expect(biblioteca.contarPorCategoria("Terror")).toBe(0);
    });

    test("deve ignorar livros que não possuem categoria", () => {
      biblioteca.adicionarLivro({
        titulo: "Livro sem categoria",
        autor: "Autor"
      });

      const resultado =
        biblioteca.buscarPorCategoria("Romance");

      expect(resultado).toHaveLength(2);
    });
  });

  describe("livrosDeUmAno", () => {
    test("deve retornar os livros publicados no ano informado", () => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.adicionarLivro(livro2);

      const resultado = biblioteca.livrosDeUmAno(1899);

      expect(resultado).toEqual([
        {
          ...livro1,
          disponivel: true
        }
      ]);
    });

    test("deve retornar uma lista vazia quando não houver livros do ano", () => {
      biblioteca.adicionarLivro(livro1);

      expect(biblioteca.livrosDeUmAno(2026)).toEqual([]);
    });
  });

  describe("livroMaisAntigo", () => {
    test("deve retornar o livro mais antigo", () => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.adicionarLivro(livro2);
      biblioteca.adicionarLivro(livro3);

      const resultado = biblioteca.livroMaisAntigo();

      expect(resultado.titulo)
        .toBe("Memórias Póstumas de Brás Cubas");
    });

    test("deve retornar null quando não houver livros", () => {
      expect(biblioteca.livroMaisAntigo()).toBeNull();
    });
  });

  describe("livroMaisRecente", () => {
    test("deve retornar o livro mais recente", () => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.adicionarLivro(livro2);
      biblioteca.adicionarLivro(livro3);

      const resultado = biblioteca.livroMaisRecente();

      expect(resultado.titulo).toBe("O Hobbit");
    });

    test("deve retornar null quando não houver livros", () => {
      expect(biblioteca.livroMaisRecente()).toBeNull();
    });
  });

  describe("possuiLivro", () => {
    test("deve retornar true quando possuir o livro", () => {
      biblioteca.adicionarLivro(livro1);

      expect(biblioteca.possuiLivro("DOM CASMURRO")).toBe(true);
    });

    test("deve retornar false quando não possuir o livro", () => {
      expect(biblioteca.possuiLivro("O Hobbit")).toBe(false);
    });
  });

  describe("historicoEmprestimos", () => {
    test("deve retornar somente os empréstimos do usuário informado", () => {
      biblioteca.adicionarLivro(livro1);
      biblioteca.adicionarLivro(livro2);

      biblioteca.emprestarLivro("Dom Casmurro", "João");
      biblioteca.emprestarLivro("O Hobbit", "Maria");

      const resultado =
        biblioteca.historicoEmprestimos("João");

      expect(resultado).toHaveLength(1);
      expect(resultado[0]).toMatchObject({
        tituloLivro: "Dom Casmurro",
        usuario: "João"
      });
    });

    test("deve retornar lista vazia quando o usuário não possuir empréstimos", () => {
      expect(biblioteca.historicoEmprestimos("João")).toEqual([]);
    });
  });

  describe("calcularMulta", () => {
    test("deve calcular R$ 2,50 para cada dia de atraso", () => {
      expect(biblioteca.calcularMulta(4)).toBe(10);
    });

    test("deve retornar zero quando não houver atraso", () => {
      expect(biblioteca.calcularMulta(0)).toBe(0);
    });

    test("deve lançar erro quando os dias forem negativos", () => {
      expect(() => biblioteca.calcularMulta(-1))
        .toThrow("Dias de atraso inválidos");
    });
  });
});
