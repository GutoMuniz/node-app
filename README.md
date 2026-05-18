# Aplicação Node.js com Redis — Contador de Visitas

Este projeto é uma aplicação simples desenvolvida em **Node.js**, utilizando o framework **Express** e integração com o banco de dados **Redis**.

O objetivo principal é demonstrar, de forma didática, como uma aplicação backend pode se conectar a um banco de dados em memória para armazenar, recuperar e atualizar informações.

Neste exemplo, o Redis será utilizado para armazenar um **contador de visitas**. Cada vez que o usuário acessa a aplicação, o contador é incrementado automaticamente.

---

## Observação Importante sobre Docker

Este repositório contém a aplicação base em Node.js.

Os arquivos relacionados à containerização, como:

Dockerfile
docker-compose.yml
serão desenvolvidos em aula, passo a passo, como parte da prática.

A ideia é que os alunos compreendam como a aplicação pode ser empacotada, executada em containers e integrada ao Redis utilizando Docker.

Durante a prática em aula, serão trabalhados os seguintes conceitos:

Criação de uma imagem Docker para a aplicação Node.js;
Criação de um container para a aplicação;
Criação de um container para o Redis;
Comunicação entre containers usando Docker Network;
Persistência de dados com Docker Volumes;
Execução de múltiplos serviços com Docker Compose.

Portanto, caso os arquivos Dockerfile e docker-compose.yml ainda não estejam no repositório, isso faz parte da proposta didática da atividade.

Objetivo do Projeto

O principal objetivo deste projeto é apresentar, de maneira prática, os seguintes conceitos:

Criação de uma aplicação web com Node.js;
Uso do framework Express;
Conexão entre uma aplicação Node.js e o Redis;
Armazenamento de dados em formato chave-valor;
Incremento automático de valores no Redis;
Organização básica de uma aplicação backend;
Preparação da aplicação para futura containerização em aula.
Tecnologias Utilizadas
Node.js

O Node.js é um ambiente de execução JavaScript no lado do servidor.

Ele permite criar aplicações backend, APIs, serviços web e sistemas capazes de receber requisições de usuários, processar dados e retornar respostas.

Neste projeto, o Node.js é responsável por executar a aplicação principal.

Express

O Express é um framework para Node.js que facilita a criação de servidores web e APIs.

Com ele, conseguimos criar rotas, receber requisições HTTP e enviar respostas para o navegador ou para ferramentas como curl, Postman e Insomnia.

Neste projeto, o Express cria uma rota principal:

/

Essa rota será acessada pelo navegador ou por ferramentas de teste e retornará o número atual de visitas.

Redis

O Redis é um banco de dados NoSQL do tipo chave-valor.

Ele é muito utilizado em aplicações modernas para:

Cache;
Sessões de usuários;
Filas;
Contadores;
Dados temporários;
Aplicações que precisam de alta velocidade.

Neste projeto, o Redis armazena uma chave chamada:

visits

Essa chave guarda o número de acessos realizados à aplicação.

Como a Aplicação Funciona

O funcionamento da aplicação é simples:

O usuário acessa a rota principal da aplicação.
A aplicação Node.js recebe a requisição.
O Node.js se conecta ao Redis.
O Redis incrementa o valor da chave visits.
A aplicação retorna o número atualizado de visitas.

Fluxo resumido:

Usuário
  ↓
Aplicação Node.js
  ↓
Redis
  ↓
Contador atualizado
  ↓
Resposta para o usuário
Estrutura Básica Inicial do Projeto

Inicialmente, o projeto terá uma estrutura simples:

.
├── index.js
├── package.json
└── README.md

Durante a aula, serão criados novos arquivos para executar a aplicação com Docker, como:

Dockerfile
docker-compose.yml
Explicação dos Arquivos
index.js

Arquivo principal da aplicação.

É nele que configuramos:

O servidor Express;
A conexão com o Redis;
A rota principal;
O incremento do contador de visitas;
O tratamento de erros;
A inicialização da aplicação.
package.json

Arquivo de configuração do projeto Node.js.

Ele define:

Nome do projeto;
Versão;
Descrição;
Arquivo principal;
Scripts de execução;
Dependências necessárias para a aplicação funcionar.

### Atenção para uso com Docker

Durante a aula, quando a aplicação for executada com Docker Compose, o endereço do Redis poderá ser alterado para usar o nome do serviço definido no Compose.

Exemplo:

const client = redis.createClient({
  url: 'redis://redis:6379'
})

Nesse caso:

redis://redis:6379

significa:

redis://   protocolo usado para conexão com Redis
redis      nome do serviço/container Redis
6379       porta padrão do Redis

Essa alteração será explicada durante a prática de Docker.

Tratamento de erro do Redis
client.on('error', (err) => {
  console.error('Erro ao conectar no Redis:', err)
})

Essa parte monitora erros de conexão com o Redis.

Caso a aplicação não consiga se conectar ao Redis, uma mensagem de erro será exibida no terminal.
