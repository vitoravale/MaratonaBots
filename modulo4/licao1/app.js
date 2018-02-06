// load env variables from the .env file
require('dotenv-extended').load()

const builder = require('botbuilder')
const restify = require('restify')


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

// Trata a intenção None - atenção com o nome da intent que é case-sensitive
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