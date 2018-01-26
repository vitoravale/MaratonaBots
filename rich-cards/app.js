// load env variables from the .env file
require('dotenv-extended').load()

const builder = require('botbuilder')
const restify = require('restify')
const cards = require('./cards')

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

const bot = new builder.UniversalBot(connector, [
    (session) => {
        builder.Prompts.choice(session, 'Digite o texto da opção que deseja visualizar', cards.CardNames, {
            maxRetries: 5,
            retryPrompt: 'O que você informou não é uma opção válida, tente novamente'
        })
    },
    (session, results) => {
        const card = cards.Create(results.response.entity, session)
        const reply = new builder.Message(session).addAttachment(card)
        session.send(reply)
    }
])
server.post('/api/messages', connector.listen())