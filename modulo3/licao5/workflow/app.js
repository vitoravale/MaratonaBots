// load env variables from the .env file
require('dotenv-extended').load()

const builder = require('botbuilder')
const formflowbotbuilder = require('formflowbotbuilder')
const restify = require('restify')
const path = require('path')


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
// Dialogs
//=========================================================

const dialogName = 'form'
const questions = path.join(__dirname, 'questions.json')

formflowbotbuilder.executeFormFlow(questions, bot, dialogName, (err, responses) => {
    if(err)
        return console.log(err)
    bot.dialog('/', [
       (session) => {
            if(!session.userData.reload)
                session.send('Olá, seja bem vindo. Será um prazer atender')
            session.beginDialog(dialogName)
       },
       (session, results) => {
           const questao = `Está correto?\n`
                        + `* Nome: ${responses.nome}\n` 
                        + `* Telefone: ${responses.telefone}\n`
                        + `* Endereço: ${responses.endereco}\n`
                        + `* Salgado: ${responses.salgado}\n`
                        + `* Bebida: ${responses.bebida}\n`
                        + `* Entrega: ${responses.entrega}`
            const options = {
                listStyle: builder.ListStyle.button,
                retryPrompt: 'Deculpa, não entendi, selecione uma das opções'
            }
            builder.Prompts.confirm(session, questao, options)
       },
       (session, results) => {
            if(results.response){
                return session.send('Seu pedido 123456 foi gerado e em instantes será entregue.')
            }
            session.userData.reload = true;
            session.send('Tudo bem, vamos tentar novamente')
            session.replaceDialog('/')
        }
    ])
})

bot.on('conversationUpdate', (update) => {
    if (update.membersAdded) {
        update.membersAdded.forEach( (identity) => {
            if (identity.id === update.address.bot.id) {
                bot.beginDialog(update.address, '/')
            }
        })
    }
})