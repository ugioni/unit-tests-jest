class Biblioteca {
    constructor() {
        this.livros = [];
        this.emprestimos = [];
    }

    // 1
    adicionarLivro(livro) {
        if (!livro || !livro.titulo || !livro.autor) {
            throw new Error("Livro inválido");
        }

        this.livros.push({
            ...livro,
            disponivel: true
        });

        return true;
    }

    // 2
    removerLivro(titulo) {
        const indice = this.livros.findIndex(
            livro => livro.titulo === titulo
        );

        if (indice === -1) {
            return false;
        }

        this.livros.splice(indice, 1);
        return true;
    }

    // 3
    buscarLivro(titulo) {
        return this.livros.find(
            livro => livro.titulo.toLowerCase() === titulo.toLowerCase()
        ) || null;
    }

    // 4
    buscarPorAutor(autor) {
        return this.livros.filter(
            livro => livro.autor.toLowerCase() === autor.toLowerCase()
        );
    }

    // 5
    listarLivrosDisponiveis() {
        return this.livros.filter(livro => livro.disponivel);
    }

    // 6
    listarLivrosIndisponiveis() {
        return this.livros.filter(livro => !livro.disponivel);
    }

    // 7
    quantidadeLivros() {
        return this.livros.length;
    }

    // 8
    quantidadeDisponiveis() {
        return this.livros.filter(livro => livro.disponivel).length;
    }

    // 9
    quantidadeIndisponiveis() {
        return this.livros.filter(livro => !livro.disponivel).length;
    }

    // 10
    emprestarLivro(titulo, usuario) {
        const livro = this.buscarLivro(titulo);

        if (!livro) {
            throw new Error("Livro não encontrado");
        }

        if (!livro.disponivel) {
            throw new Error("Livro indisponível");
        }

        livro.disponivel = false;

        this.emprestimos.push({
            tituloLivro: titulo,
            usuario,
            data: new Date()
        });

        return true;
    }

    // 11
    devolverLivro(titulo) {
        const livro = this.buscarLivro(titulo);

        if (!livro) {
            throw new Error("Livro não encontrado");
        }

        if (livro.disponivel) {
            throw new Error("Livro já está disponível");
        }

        livro.disponivel = true;

        return true;
    }

    // 12
    estaDisponivel(titulo) {
        const livro = this.buscarLivro(titulo);

        if (!livro) {
            return false;
        }

        return livro.disponivel;
    }

    // 13
    buscarPorCategoria(categoria) {
        return this.livros.filter(
            livro => livro.categoria?.toLowerCase() === categoria.toLowerCase()
        );
    }

    // 14
    contarPorCategoria(categoria) {
        return this.buscarPorCategoria(categoria).length;
    }

    // 15
    livrosDeUmAno(ano) {
        return this.livros.filter(
            livro => livro.ano === ano
        );
    }

    // 16
    livroMaisAntigo() {
        if (this.livros.length === 0) {
            return null;
        }

        return this.livros.reduce((maisAntigo, livro) => {
            return livro.ano < maisAntigo.ano
                ? livro
                : maisAntigo;
        });
    }

    // 17
    livroMaisRecente() {
        if (this.livros.length === 0) {
            return null;
        }

        return this.livros.reduce((maisRecente, livro) => {
            return livro.ano > maisRecente.ano
                ? livro
                : maisRecente;
        });
    }

    // 18
    possuiLivro(titulo) {
        return this.buscarLivro(titulo) !== null;
    }

    // 19
    historicoEmprestimos(usuario) {
        return this.emprestimos.filter(
            emprestimo => emprestimo.usuario === usuario
        );
    }

    // 20
    calcularMulta(diasAtraso) {
        if (diasAtraso < 0) {
            throw new Error("Dias de atraso inválidos");
        }

        const valorPorDia = 2.50;

        return diasAtraso * valorPorDia;
    }
}

module.exports = Biblioteca;