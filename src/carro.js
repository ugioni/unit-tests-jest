class Carro {
    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.kilometragem = 0;
    }

    dirigir(distancia) {
        if (distancia > 0) {
            this.kilometragem += distancia;
        }
    }

    obterInfo() {
        return `${this.marca} ${this.modelo}, Ano: ${this.ano}, Quilometragem: ${this.kilometragem} km`;
    }
}

module.exports = Carro;
