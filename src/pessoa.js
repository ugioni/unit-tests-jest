class Pessoa {
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() {
        return `Olá, meu nome é ${this.nome} e eu tenho ${this.idade} anos.`;
    }

    atualizarIdade(novaIdade) {
        this.idade = novaIdade;
    }
}

module.exports = Pessoa;
