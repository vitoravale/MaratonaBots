// load env variables from the .env file
require('dotenv-extended').load()

const builder = require('botbuilder')
const restify = require('restify')
const config = require('./config')


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

bot.dialog('menu', [
    (session) => {
        if(!session.userData.reload)
            session.send('Olá, seja bem vindo. Será um prazer atender')
        session.beginDialog('salgadinhos')
    },
    (session, results) => {
    },
    (session) => {
        session.replaceDialog('menu')
    }
]).reloadAction('showMenu', null, { matches: /ˆ(menu|voltar)/i })

bot.dialog('salgadinhos', [
    (session) => {
        builder.Prompts.choice(
            session, 
            "Por favor escolha seu salgado", 
            config.salgados, 
            config.promptChoiceOptions
        )
    },
    (session, results) => {
        session.userData.salgado = results.response.entity
        session.beginDialog('bebidas')
    }
])

bot.dialog('bebidas', [
    (session) => {
        builder.Prompts.choice(
            session, 
            "Por favor escolha sua bebida", 
            config.bebidas, 
            config.promptChoiceOptions
        )
    },
    (session, results) => {
        session.userData.bebida = results.response.entity
        session.beginDialog('entrega')
    }
])

bot.dialog('entrega', [
    (session) => {
        builder.Prompts.choice(
            session, 
            "Por favor escolha a forma de entrega", 
            config.entrega, 
            config.promptChoiceOptions
        )
    },
    (session, results) => {
        session.userData.entrega = results.response.entity
        session.beginDialog('endereco')
    },
])

bot.dialog('endereco', [
    (session) => {
        builder.Prompts.text(session, 'Por favor, informe seu nome')
    },
    (session, results) => {
        session.userData.nome = results.response
        builder.Prompts.text(session, 'Por favor, informe seu telefone')
    },
    (session, results) => {
        session.userData.telefone = results.response
        builder.Prompts.text(session, 'Por favor, informe seu endereço')
    },
    (session, results) => {
        session.userData.endereco = results.response
        session.beginDialog('fechamento')
    }
])

bot.dialog('fechamento', [
    (session) => {
        const questao = `Está correto?\n`
                        + `* Nome: ${session.userData.nome}\n` 
                        + `* Telefone: ${session.userData.telefone}\n`
                        + `* Endereço: ${session.userData.endereco}\n`
                        + `* Salgado: ${session.userData.salgado}\n`
                        + `* Bebida: ${session.userData.bebida}\n`
                        + `* Entrega: ${session.userData.entrega}`
        builder.Prompts.confirm(session, questao, config.promptChoiceOptions)
    },
    (session, results) => {
        if(results.response){
            return session.send('Seu pedido 123456 foi gerado e em instantes será entregue.')
        }
        session.userData.reload = true;
        session.send('Tudo bem, vamos tentar novamente')
        session.replaceDialog('menu')
    }
])

bot.on('conversationUpdate', (update) => {
    if (update.membersAdded) {
        update.membersAdded.forEach( (identity) => {
            if (identity.id === update.address.bot.id) {
                bot.beginDialog(update.address, 'menu')
            }
        })
    }
})