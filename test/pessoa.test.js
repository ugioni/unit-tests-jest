const Pessoa = require('../src/pessoa');

describe('Testes da classe Pessoa', () => {
    let pessoa;

    beforeEach(() => {
        pessoa = new Pessoa('Maria', 30);
    });

    test('Deve criar uma pessoa com o nome e idade corretos', () => {
        expect(pessoa.nome).toBe('Maria');
        expect(pessoa.idade).toBe(30);
    });

    test('Deve apresentar a pessoa corretamente', () => {
        const apresentacao = pessoa.apresentar();
        expect(apresentacao).toBe('Olá, meu nome é Maria e eu tenho 30 anos.');
    });

    test('Deve atualizar a idade da pessoa corretamente', () => {
        pessoa.atualizarIdade(31);
        expect(pessoa.idade).toBe(31);
    });

    test('Deve retornar a apresentação atualizada após mudança de idade', () => {
        pessoa.atualizarIdade(31);
        const apresentacao = pessoa.apresentar();
        expect(apresentacao).toBe('Olá, meu nome é Maria e eu tenho 31 anos.');
    });
});
