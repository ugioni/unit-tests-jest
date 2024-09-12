export default class Carro {
    public marca: string;
    public modelo: string;
    public ano: number;
    public kilometragem: number;

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

