class GerenciadorDeTarefas {
    constructor() {
        this.tarefas = [];
    }

    adicionarTarefa(tarefa) {
        if (tarefa.descricao.length <= 3) {
            throw new Error('Erro ao cadastrar tarefa');
        }
        this.tarefas.push(tarefa);
    }

    removerTarefa(id) {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
    }

    buscarTarefaPorId(id) {
        return this.tarefas.find(tarefa => tarefa.id === id);
    }

    atualizarTarefa(id, novosDados) {
        const index = this.tarefas.findIndex(tarefa => tarefa.id === id);
        if (index !== -1) {
            this.tarefas[index] = { ...this.tarefas[index], ...novosDados };
        }
    }

    listarTarefas() {
        return this.tarefas;
    }

    contarTarefas() {
        return this.tarefas.length;
    }

    marcarTarefaComoConcluida(id) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.concluida = true;
        }
    }

    listarTarefasConcluidas() {
        return this.tarefas.filter(tarefa => tarefa.concluida);
    }

    listarTarefasPendentes() {
        return this.tarefas.filter(tarefa => !tarefa.concluida);
    }

    removerTarefasConcluidas() {
        this.tarefas = this.tarefas.filter(tarefa => !tarefa.concluida);
    }

    buscarTarefaPorDescricao(descricao) {
        return this.tarefas.filter(tarefa => tarefa.descricao.includes(descricao));
    }

    adicionarTagATarefa(id, tag) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.tags = tarefa.tags || [];
            tarefa.tags.push(tag);
        }
    }

    removerTagDaTarefa(id, tag) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa && tarefa.tags) {
            tarefa.tags = tarefa.tags.filter(t => t !== tag);
        }
    }

    listarTarefasPorTag(tag) {
        return this.tarefas.filter(tarefa => tarefa.tags && tarefa.tags.includes(tag));
    }

    buscarTarefasPorData(data) {
        return this.tarefas.filter(tarefa => tarefa.data === data);
    }

    atualizarPrioridade(id, novaPrioridade) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.prioridade = novaPrioridade;
        }
    }

    listarTarefasPorPrioridade(prioridade) {
        return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade);
    }

    contarTarefasPorPrioridade(prioridade) {
        return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade).length;
    }

    marcarTodasComoConcluidas() {
        this.tarefas.forEach(tarefa => {
            tarefa.concluida = true;
        });
    }

    reabrirTarefa(id) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.concluida = false;
        }
    }

    ordenarTarefasPorData() {
        this.tarefas.sort((a, b) => new Date(a.data) - new Date(b.data));
    }

    ordenarTarefasPorPrioridade() {
        this.tarefas.sort((a, b) => a.prioridade - b.prioridade);
    }
}

module.exports = GerenciadorDeTarefas;