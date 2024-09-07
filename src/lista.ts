export class ListaDeCompras {
    private itens: string[];

    constructor() {
        this.itens = [];
    }

    adicionarItem(item: string) {
        this.itens.push(item);
    }

    removerItem(item: string) {
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
