// load env variables from the .env file
require('dotenv-extended').load()

const builder = require('botbuilder')
const restify = require('restify')
const cognitiveServices = require('botbuilder-cognitiveservices')


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
    const moedas = builder.EntityRecognizer.findAllEntities(args.entities, 'moeda')
    const message = moedas.map(m => m.entity).join(', ')
    session.send(`Eu farei uma cotação para as moedas **${message}**`)
})

// Trata a intenção None - atenção com o nome da intent que é case-sensitive
intents.onDefault((session, args) => {
    session.send(`Desculpe, não pude compreender **${session.message.text}**`)
})

bot.dialog('/', intents)