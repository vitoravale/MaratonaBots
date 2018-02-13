// load env variables from the .env file
require('dotenv-extended').load()

const builder = require('botbuilder')
const restify = require('restify')
const utils = require('./utils')
const descreverImagemDialog = require('../shared/dialogs/descrever-imagem-dialog')
const reconhecerEmocoesDialog = require('../shared/dialogs/reconhecer-emocoes-dialog')
const classificarImagemDialog = require('../shared/dialogs/classificar-imagem-dialog')

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
  appPassword: process.env.MICROSOFT_APP_PASSWORD
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

intents.matches('None', (session, args, next) => {
    session.send('**( ͡° ͜ʖ ͡°)** - Desculpe, mas não entendi o que você quis dizer.\n\nLembre-se que sou um bot e meu conhecimento é limitado.')
})

intents.matches('consciencia', (session, args, next) => {
    session.send('**(▀̿Ĺ̯▀̿ ̿)** - Eu sou famoso **Bot Inteligentão**\n\nFalo vários idiomas e reconheço padrões...')
})

intents.matches('ajudar', (session, args, next) => {
    const message = 'Não se esqueça que eu sou um **Bot** e minha conversação é limitada. Olha ai o que eu consigo fazer:\n' +
                    '* **Falar que nem gente**\n' +
                    '* **Descrever imagens**\n' +
                    '* **Reconhecer emoções**\n' +
                    '* **Classificar objetos**\n' +
                    '* **Traduzir textos**\n' +
                    '* **Recomendar produtos por item**\n' +
                    '* **Recomendar produtos para um determinado perfil**'
                    session.send(message)
})

intents.matches('saudar', (session, args, next) => {
    session.send(`${utils.greeting()}! Em que posso ajudar?`)
})

intents.matches('reconhecer-emocoes', reconhecerEmocoesDialog)

intents.matches('descrever-imagem', descreverImagemDialog)

intents.matches('classificar-imagem', classificarImagemDialog)

intents.matches('traduzir-texto', (session, args, next) => {
    session.send('**(ಥ﹏ಥ)** - Ainda estou estudando... tenha um pouco de paciência...')
})

intents.matches('recomendar-por-produto', (session, args, next) => {
    const produto = builder.EntityRecognizer.findEntity(args.entities, 'produto')
    if(produto && produto.entity && !!produto.entity.length){
        session.send(`**(¬‿¬)** - Eu ainda não sei fazer recomendações mas já identifico o código do seu produto: **${produto.entity}**`)
    }
    else {
        session.send('**(ಥ﹏ಥ)** - Foi mal, não sei recomendar nada, mas quando aprender vou precisar do seu código de produto...')
    }
})

intents.matches('recomendar-por-perfil', (session, args, next) => {
    const usuario = builder.EntityRecognizer.findEntity(args.entities, 'usuario')
    if(usuario && usuario.entity && !!usuario.entity.length){
        session.send(`**(¬‿¬)** - Seu id de usuário é **${usuario.entity}**. Quando eu aprender a recomendar eu te respondo...`)
    }
    else {
        session.send('**(ಥ﹏ಥ)** - Foi mal, não sei recomendar nada, mas quando aprender vou precisar do seu id de usuário...')
    }
})

intents.onDefault((session, args) => {
    session.send(`Desculpe, não pude compreender **${session.message.text}**\n\nLembre-se que sou um bot e meu conhecimento é limitado.`)
})

bot.on('conversationUpdate', (update) => {
    if (update.membersAdded) {
        update.membersAdded.forEach( (identity) => {
            if (identity.id === update.address.bot.id) {
                bot.loadSession(update.address, (err, session) => {
                    if(err)
                        return err
                    const message = 'Olá, eu sou o **Bot Inteligentão**. Curte ai o que eu posso fazer:\n' +
                    '* **Falar que nem gente**\n' +
                    '* **Descrever imagens**\n' +
                    '* **Reconhecer emoções**\n' +
                    '* **Classificar objetos**\n' +
                    '* **Traduzir textos**\n' +
                    '* **Recomendar produtos por item**\n' +
                    '* **Recomendar produtos para um determinado perfil**'
                    session.send(message)
                })
            }
        })
    }
})

bot.dialog('/', intents)