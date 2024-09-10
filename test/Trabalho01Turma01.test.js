const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('GerenciadorDeTarefas', () => {
  let gerenciador;

  beforeEach(() => {
    gerenciador = new GerenciadorDeTarefas();
  });

  test('Deve adicionar uma tarefa', () => {
    const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
    gerenciador.adicionarTarefa(tarefa);
    expect(gerenciador.tarefas).toContain(tarefa);
  });

  test('Deve remover uma tarefa', () => {
    const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.removerTarefa(1);
    expect(gerenciador.tarefas).not.toContain(tarefa);
  });

  test('Deve buscar uma tarefa por ID', () => {
    const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
    gerenciador.adicionarTarefa(tarefa);
    const resultado = gerenciador.buscarTarefaPorId(1);
    expect(resultado).toBe(tarefa);
  });

  test('Deve atualizar uma tarefa', () => {
    const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: false };
    gerenciador.adicionarTarefa(tarefa);
    gerenciador.atualizarTarefa(1, { descricao: 'Tarefa Atualizada' });
    expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Tarefa Atualizada');
  });

  test('Validação de Erro ao cadastrar tarefa', () => {
    const tarefa = { id: 1, descricao: 'tes', concluida: false };
    expect(() => {
      gerenciador.adicionarTarefa(tarefa);
    }).toThrow('Erro ao cadastrar tarefa');
  });
});
