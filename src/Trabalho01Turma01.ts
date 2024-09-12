export type Tarefa = {
    id: number;
    concluida?: boolean;
    descricao: string;
    data?: Date;
    tags?: string[];
    prioridade?: number;
}

type CriarTarefaDto = Omit<Tarefa, "id">

export class GerenciadorDeTarefas {
    public tarefas: Tarefa[];

    constructor() {
        this.tarefas = [];
    }

    adicionarTarefa(tarefa: Tarefa) {
        if (tarefa.descricao.length <= 3) {
            throw new Error('Erro ao cadastrar tarefa');
        }
        this.tarefas.push(tarefa);
    }

    removerTarefa(id: number) {
        this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
    }

    buscarTarefaPorId(id: number) {
        return this.tarefas.find(tarefa => tarefa.id === id);
    }

    atualizarTarefa(id: number, novosDados: CriarTarefaDto) {
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

    marcarTarefaComoConcluida(id: number) {
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

    buscarTarefaPorDescricao(descricao: string) {
        return this.tarefas.filter(tarefa => tarefa.descricao.includes(descricao));
    }

    adicionarTagATarefa(id: number, tag: string) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.tags = tarefa.tags || [];
            tarefa.tags.push(tag);
        }
    }

    removerTagDaTarefa(id: number, tag: string) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa && tarefa.tags) {
            tarefa.tags = tarefa.tags.filter(t => t !== tag);
        }
    }

    listarTarefasPorTag(tag: string) {
        return this.tarefas.filter(tarefa => tarefa.tags && tarefa.tags.includes(tag));
    }

    buscarTarefasPorData(data: Date) {
        return this.tarefas.filter(tarefa => tarefa.data === data);
    }

    atualizarPrioridade(id: number, novaPrioridade: number) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.prioridade = novaPrioridade;
        }
    }

    listarTarefasPorPrioridade(prioridade: number) {
        return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade);
    }

    contarTarefasPorPrioridade(prioridade: number) {
        return this.tarefas.filter(tarefa => tarefa.prioridade === prioridade).length;
    }

    marcarTodasComoConcluidas() {
        this.tarefas.forEach(tarefa => {
            tarefa.concluida = true;
        });
    }

    reabrirTarefa(id: number) {
        const tarefa = this.buscarTarefaPorId(id);
        if (tarefa) {
            tarefa.concluida = false;
        }
    }

    ordenarTarefasPorData() {
        this.tarefas.sort((a, b) => new Date(a.data!).getTime() - new Date(b.data!).getTime());
    }

    ordenarTarefasPorPrioridade() {
        this.tarefas.sort((a, b) => a.prioridade! - b.prioridade!);
    }
}
