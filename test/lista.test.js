const ListaDeCompras = require('../src/lista');

describe('Testes da classe ListaDeCompras', () => {
    let lista;

    beforeEach(() => {
        lista = new ListaDeCompras();
        lista.adicionarItem('Leite');
        lista.adicionarItem('Pão');
    });

    test('Deve adicionar itens corretamente à lista', () => {
        expect(lista.obterItens()).toEqual(['Leite', 'Pão']);
    });

    test('Deve remover um item existente da lista', () => {
        lista.removerItem('Leite');
        expect(lista.obterItens()).toEqual(['Pão']);
    });

    test('Deve lançar um erro ao tentar remover um item que não existe na lista', () => {
        expect(() => lista.removerItem('Manteiga')).toThrow("Item não encontrado na lista");
    });

    test('Deve lançar um erro específico ao tentar remover um item inexistente', () => {
        try {
            lista.removerItem('Manteiga');
        } catch (e) {
            expect(e.message).toBe("Item não encontrado na lista");
        }
    });
});
