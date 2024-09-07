export class Carro {
    private marca: string;
    private modelo: string;
    private ano: number;
    private kilometragem: number;

    constructor(marca: string, modelo: string, ano: number) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.kilometragem = 0;
    }

    dirigir(distancia: number) {
        if (distancia > 0) {
            this.kilometragem += distancia;
        }
    }

    obterInfo() {
        return `${this.marca} ${this.modelo}, Ano: ${this.ano}, Quilometragem: ${this.kilometragem} km`;
    }
}

