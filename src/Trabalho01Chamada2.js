class SistemaDeGestao {
    constructor() {
      this.funcionarios = [];
      this.projetos = [];
      this.departamentos = [];
      this.financeiro = {
        receitas: 0,
        despesas: 0,
      };
    }
  
    // Métodos para Funcionários
    adicionarFuncionario(funcionario) {
      this.funcionarios.push(funcionario);
    }
  
    removerFuncionario(id) {
      this.funcionarios = this.funcionarios.filter(func => func.id !== id);
    }
  
    buscarFuncionarioPorId(id) {
      return this.funcionarios.find(func => func.id === id);
    }
  
    listarFuncionarios() {
      return this.funcionarios;
    }
  
    atualizarFuncionario(id, novosDados) {
      const funcionario = this.buscarFuncionarioPorId(id);
      if (funcionario) {
        Object.assign(funcionario, novosDados);
      }
    }
  
    listarFuncionariosPorDepartamento(departamento) {
      return this.funcionarios.filter(func => func.departamento === departamento);
    }
  
    contarFuncionarios() {
      return this.funcionarios.length;
    }
  
    contarFuncionariosPorDepartamento(departamento) {
      return this.funcionarios.filter(func => func.departamento === departamento).length;
    }
  
    listarFuncionariosPorCargo(cargo) {
      return this.funcionarios.filter(func => func.cargo === cargo);
    }
  
    aumentarSalario(id, percentual) {
      const funcionario = this.buscarFuncionarioPorId(id);
      if (funcionario) {
        funcionario.salario += funcionario.salario * (percentual / 100);
      }
    }
  
    demitirFuncionario(id) {
      this.removerFuncionario(id);
    }
  
    // Métodos para Projetos
    adicionarProjeto(projeto) {
      this.projetos.push(projeto);
    }
  
    removerProjeto(id) {
      this.projetos = this.projetos.filter(projeto => projeto.id !== id);
    }
  
    buscarProjetoPorId(id) {
      return this.projetos.find(projeto => projeto.id === id);
    }
  
    listarProjetos() {
      return this.projetos;
    }
  
    atualizarProjeto(id, novosDados) {
      const projeto = this.buscarProjetoPorId(id);
      if (projeto) {
        Object.assign(projeto, novosDados);
      }
    }
  
    listarProjetosPorDepartamento(departamento) {
      return this.projetos.filter(projeto => projeto.departamento === departamento);
    }
  
    listarProjetosPorFuncionario(idFuncionario) {
      return this.projetos.filter(projeto => projeto.idFuncionarioResponsavel === idFuncionario);
    }
  
    contarProjetos() {
      return this.projetos.length;
    }
  
    contarProjetosPorDepartamento(departamento) {
      return this.projetos.filter(projeto => projeto.departamento === departamento).length;
    }
  
    marcarProjetoComoConcluido(id) {
      const projeto = this.buscarProjetoPorId(id);
      if (projeto) {
        projeto.concluido = true;
      }
    }
  
    listarProjetosConcluidos() {
      return this.projetos.filter(projeto => projeto.concluido);
    }
  
    listarProjetosEmAndamento() {
      return this.projetos.filter(projeto => !projeto.concluido);
    }
  
    // Métodos para Departamentos
    adicionarDepartamento(departamento) {
      this.departamentos.push(departamento);
    }
  
    removerDepartamento(id) {
      this.departamentos = this.departamentos.filter(dep => dep.id !== id);
    }
  
    listarDepartamentos() {
      return this.departamentos;
    }
  
    buscarDepartamentoPorId(id) {
      return this.departamentos.find(dep => dep.id === id);
    }
  
    atualizarDepartamento(id, novosDados) {
      const departamento = this.buscarDepartamentoPorId(id);
      if (departamento) {
        Object.assign(departamento, novosDados);
      }
    }
  
    contarDepartamentos() {
      return this.departamentos.length;
    }
  
    listarFuncionariosPorDepartamentoId(id) {
      const departamento = this.buscarDepartamentoPorId(id);
      return this.funcionarios.filter(func => func.departamento === departamento.nome);
    }
  
    // Métodos Financeiros
    adicionarReceita(valor) {
      this.financeiro.receitas += valor;
    }
  
    adicionarDespesa(valor) {
      this.financeiro.despesas += valor;
    }
  
    calcularLucro() {
      return this.financeiro.receitas - this.financeiro.despesas;
    }
  
    listarReceitas() {
      return this.financeiro.receitas;
    }
  
    listarDespesas() {
      return this.financeiro.despesas;
    }
  
    relatorioFinanceiro() {
      return {
        receitas: this.financeiro.receitas,
        despesas: this.financeiro.despesas,
        lucro: this.calcularLucro(),
      };
    }
  }

  module.exports = SistemaDeGestao;
  