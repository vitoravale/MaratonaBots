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
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

const bot = new builder.UniversalBot(connector, [
    (session) => {
        // Se for enviado pelo botão com postback do hero card ou thumbnail card será despachada uma mensagem
        if(session.message.text === 'postbackmessage'){
            return session.send('Esta mensagem foi gerada como resposta à ação de postback')
        }
        
        builder.Prompts.choice(session, 'Digite o texto da opção que deseja visualizar', cards.CardNames, {
            maxRetries: 5,
            retryPrompt: 'O que você informou não é uma opção válida, tente novamente'
        })
    },
    (session, results) => {
        const card = cards.Create(results.response.entity, session)
        // Se o retorno for um array, temos um carousel e o tratamento deve ser um pouco diferente
        const reply = Array.isArray(card) 
                ? new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(card) 
                : new builder.Message(session)
                    .addAttachment(card)
        session.send(reply)
    }
])
server.post('/api/messages', connector.listen())