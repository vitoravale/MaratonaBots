// load env variables from the .env file
require('dotenv-extended').load()

const builder = require('botbuilder')
const restify = require('restify')
const request = require('request')


//=========================================================
// Bot Setup
//=========================================================

const port = process.env.port || process.env.PORT || 3978
const server = restify.createServer()
server.listen(port, () => {
    console.log(`${server.name} listening to ${server.url}`)
})

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORd
})

const bot = new builder.UniversalBot(connector)
bot.set('storage', new builder.MemoryBotStorage())
server.post('/api/messages', connector.listen())

//=========================================================
// LUIS Dialogs
//=========================================================

const recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL)

const intents = new builder.IntentDialog({
    recognizers: [recognizer]
})

// Trata a intenção sobre - atenção com o nome da intent que é case-sensitive
intents.matches('sobre', (session, args, next) => {
    session.send('Olá eu sou um bot, estou aqui para lhe ajudar.')
})

// Trata a intenção cumprimento - atenção com o nome da intent que é case-sensitive
intents.matches('cumprimento', (session, args, next) => {
    session.send('Olá, eu sou um bot que faz cotação de moedas')
})

// Trata a intenção cotacao - atenção com o nome da intent que é case-sensitive
intents.matches('cotacao', (session, args, next) => {
    const moedas = builder.EntityRecognizer.findAllEntities(args.entities, 'moeda').map(m => m.entity).join(', ')
    const endpoint = `${process.env.COTACAO_ENDPOINT}${moedas}`
    session.send('Aguarde um momento enquanto eu consulto a cotação das moedas.')
    request(endpoint, (error, response, body) => {
        if(error || !body)
            return session.send('Ocorreu algum erro, tente novamente mais tarde.')
        const cotacoes = JSON.parse(body);
        session.send(cotacoes.map(m => `${m.nome}: ${m.valor}` ).join(', '))
    })
})

// Trata a intenção None - atenção com o nome da intent que é case-sensitive
intents.onDefault((session, args) => {
    session.send(`Desculpe, não pude compreender **${session.message.text}**`)
})

bot.dialog('/', intents)