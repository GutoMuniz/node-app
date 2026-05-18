// Importa o framework Express para criar o servidor web
const express = require('express')

// Importa a biblioteca Redis para conexão com o banco Redis
const redis = require('redis')

// Cria a aplicação Express
const app = express()

// Define a porta onde a aplicação irá rodar
const PORT = 8081

// Cria o cliente Redis e define o endereço do servidor Redis
// "redis" é o nome do container/serviço no Docker Compose
const client = redis.createClient({
  url: 'redis://redis:6379'
})

// Monitora erros de conexão com o Redis
client.on('error', (err) => {
  console.error('Erro ao conectar no Redis:', err)
})

// Função principal para iniciar Redis + aplicação
async function start() {

  // Conecta ao servidor Redis
  await client.connect()

  // Verifica se a chave "visits" já existe
  const visitasExistem = await client.exists('visits')

  // Se não existir, cria a chave com valor inicial 0
  // Isso evita resetar o contador sempre que reiniciar a aplicação
  if (!visitasExistem) {
    await client.set('visits', 0)
  }

  // Define a rota principal "/"
  // Toda vez que alguém acessar, incrementa o contador
  app.get('/', async (req, res) => {

    try {

      // Incrementa automaticamente o valor da chave "visits" em +1
      // Redis faz isso de forma nativa e mais eficiente
      const visits = await client.incr('visits')

      // Retorna o número de visitas para o navegador
      res.send(`Número de visitas: ${visits}`)

    } catch (error) {

      // Caso haja erro ao acessar Redis, mostra no terminal
      console.error('Erro ao acessar o Redis:', error)

      // Retorna erro HTTP 500 para o usuário
      res.status(500).send('Erro interno ao acessar o Redis')
    }
  })

  // Inicia o servidor na porta definida
  app.listen(PORT, () => {

    // Mostra mensagem no terminal confirmando execução
    console.log(`Serviço rodando na porta ${PORT}`)
  })
}

// Executa a função principal
start()
