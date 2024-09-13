# Trabalho 01 Automação de testes - Testes de unidade 

## Github Actions

[![Build and Tests](https://github.com/JoelFrancisco/JoelFrancisco-Turma02-Trabalho01/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/JoelFrancisco/JoelFrancisco-Turma02-Trabalho01/actions/workflows/node.js.yml)

O projeto possui um job no github actions para a execução dos testes em pipeline.

## Sobre o projeto

O projeto foi desenvolvido como o primeiro trabalho da disciplina de Automação de Testes do curso de Engenharia de Software - SATC 

O objetivo era aprender o uso de testes de unidade com o framework Jest, um dos mais utilizados no mercado javascript/typescript.

## Pré requisitos para execução

- Nodejs versão >= 20.x
    (https://nodejs.org/en/download/package-manager/current)

## Como executar

Instale as dependências:

```
npm install
```

Rode os testes

```
npm run test
```

Ou rode em watch mode

```
npm run test:watch
```

Para ver a cobertura

```
npm run coverage
```

Os artefatos gerados podem ser encontrados em ./coverge e podem ser removidos com:

```
npm run clean
```

## Feito por

**Criado por:** Joel Francisco da Silva Filho

Com base no reposítorio fornecido pelo professor Leandro Ugioni, disponível em: https://github.com/ugioni/unit-tests-jest