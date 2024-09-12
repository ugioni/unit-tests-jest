class Biblioteca {
    constructor() {
        this.livros = [];
        this.membros = [];
    }

    adicionarLivro(livro) {
        this.livros.push(livro);
    }

    removerLivro(id) {
        this.livros = this.livros.filter(livro => livro.id !== id);
    }

    buscarLivroPorId(id) {
        return this.livros.find(livro => livro.id === id);
    }

    buscarLivroPorTitulo(titulo) {
        return this.livros.filter(livro => livro.titulo.includes(titulo));
    }

    listarLivros() {
        return this.livros;
    }

    adicionarMembro(membro) {
        this.membros.push(membro);
    }

    removerMembro(id) {
        this.membros = this.membros.filter(membro => membro.id !== id);
    }

    buscarMembroPorId(id) {
        return this.membros.find(membro => membro.id === id);
    }

    listarMembros() {
        return this.membros;
    }

    emprestarLivro(idLivro, idMembro) {
        const livro = this.buscarLivroPorId(idLivro);
        const membro = this.buscarMembroPorId(idMembro);
        if (livro && membro && !livro.emprestado) {
            livro.emprestado = true;
            livro.idMembro = idMembro;
            return true;
        }
        return false;
    }

    devolverLivro(idLivro) {
        const livro = this.buscarLivroPorId(idLivro);
        if (livro && livro.emprestado) {
            livro.emprestado = false;
            delete livro.idMembro;
            return true;
        }
        return false;
    }

    listarLivrosEmprestados() {
        return this.livros.filter(livro => livro.emprestado);
    }

    listarLivrosDisponiveis() {
        return this.livros.filter(livro => !livro.emprestado);
    }

    contarLivros() {
        return this.livros.length;
    }

    contarMembros() {
        return this.membros.length;
    }

    listarLivrosPorAutor(autor) {
        return this.livros.filter(livro => livro.autor.includes(autor));
    }

    listarLivrosPorGenero(genero) {
        return this.livros.filter(livro => livro.genero.includes(genero));
    }

    atualizarInformacaoLivro(id, novosDados) {
        const livro = this.buscarLivroPorId(id);
        if (livro) {
            Object.assign(livro, novosDados);
        }
    }

    listarLivrosPorAno(ano) {
        return this.livros.filter(livro => livro.ano === ano);
    }
}

module.exports = Biblioteca;