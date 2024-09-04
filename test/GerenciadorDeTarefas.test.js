const GerenciadorDeTarefas = require('../src/Trabalho01Turma01');

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('deve adicionar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContainEqual(tarefa);
    });

    test('não deve adicionar uma tarefa com descrição curta', () => {
        expect(() => {
            gerenciador.adicionarTarefa({ id: 1, descricao: 'abc' });
        }).toThrow('Erro ao cadastrar tarefa');
    });

    test('deve remover uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(1);
        expect(gerenciador.listarTarefas()).not.toContainEqual(tarefa);
    });

    test('deve buscar uma tarefa por ID', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorId(1)).toEqual(tarefa);
    });

    test('deve atualizar uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(1, { descricao: 'Tarefa Atualizada' });
        expect(gerenciador.buscarTarefaPorId(1).descricao).toBe('Tarefa Atualizada');
    });

    test('deve listar todas as tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefas()).toEqual([tarefa1, tarefa2]);
    });

    test('deve contar tarefas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('deve marcar uma tarefa como concluída', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('deve listar tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toEqual([tarefa1]);
    });

    test('deve listar tarefas pendentes', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toEqual([tarefa1]);
    });

    test('deve remover tarefas concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.removerTarefasConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([tarefa2]);
    });

    test('deve buscar tarefas por descrição', () => {
        const tarefa = { id: 1, descricao: 'Tarefa Importante' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefaPorDescricao('Importante')).toEqual([tarefa]);
    });

    test('deve adicionar e remover tags de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(1, 'tag1');
        expect(gerenciador.buscarTarefaPorId(1).tags).toContain('tag1');
        gerenciador.removerTagDaTarefa(1, 'tag1');
        expect(gerenciador.buscarTarefaPorId(1).tags).not.toContain('tag1');
    });

    test('deve listar tarefas por tag', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', tags: ['tag1'] };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefasPorTag('tag1')).toEqual([tarefa]);
    });

    test('deve buscar tarefas por data', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', data: '2024-09-01' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.buscarTarefasPorData('2024-09-01')).toEqual([tarefa]);
    });

    test('deve atualizar e listar tarefas por prioridade', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarPrioridade(1, 1);
        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe(1);
        expect(gerenciador.listarTarefasPorPrioridade(1)).toEqual([tarefa]);
    });

    test('deve contar tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', prioridade: 1 };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefasPorPrioridade(1)).toBe(2);
    });

    test('deve marcar todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1' };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.marcarTodasComoConcluidas();
        expect(gerenciador.listarTarefas()).toEqual([
            { ...tarefa1, concluida: true },
            { ...tarefa2, concluida: true }
        ]);
    });

    test('deve reabrir uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa 1', concluida: true };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.reabrirTarefa(1);
        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
    });
});
