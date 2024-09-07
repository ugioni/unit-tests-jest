export class Pessoa {
    private nome: string;
    private idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }

    apresentar() {
        return `Olá, meu nome é ${this.nome} e eu tenho ${this.idade} anos.`;
    }

    atualizarIdade(novaIdade: number) {
        this.idade = novaIdade;
    }
}