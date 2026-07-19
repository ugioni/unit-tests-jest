class ListaDeCompras {
    constructor() {
        this.itens = [];
    }

    adicionarItem(item) {
        this.itens.push(item);
    }

    removerItem(item) {
        const index = this.itens.indexOf(item);
        if (index === -1) {
            throw new Error("Item não encontrado na lista");
        }
        this.itens.splice(index, 1);
    }

    obterItens() {
        return this.itens;
    }
}

module.exports = ListaDeCompras;
