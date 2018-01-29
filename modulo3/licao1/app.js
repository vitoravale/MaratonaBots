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

const bot = new builder.UniversalBot(connector, (session) => {
    session.send(`You sent ${session.message.text} wich was ${session.message.text.length} characters`);
})
bot.set('storage', new builder.MemoryBotStorage())
server.post('/api/messages', connector.listen())

bot.on('deleteUserData', (message) => {
    console.log(`deleteUserData ${JSON.stringify(message)}`)
})

bot.on('conversationUpdate', (message) => {
    console.log(`conversationUpdate ${JSON.stringify(message)}`)
})

bot.on('contactRelationUpdate', (message) => {
    console.log(`contactRelationUpdate ${JSON.stringify(message)}`)
})

bot.on('typing', (message) => {
    console.log(`typing ${JSON.stringify(message)}`)  
})

bot.on('ping', (message) => {
    console.log(`ping ${JSON.stringify(message)}`)
})
