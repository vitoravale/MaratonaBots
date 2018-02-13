const builder = require('botbuilder')
const validUrl = require('valid-url')
const AzureTranslate = require('../services/azure-translate')
const utils = require('../utils')

module.exports = [
    (session, args, next) => {
        builder.Prompts.text(session, '**(▀̿Ĺ̯▀̿ ̿)** - Ok, me fala o texto então...')
    },
    (session, result) => {
        new AzureTranslate().translateText(result.response)
            .then(traducaoSucces(session))
            .catch(traducaoError(session))
    }
]

const traducaoSucces = (session) => {
    return (result) => {
        session.send(`Texto original: **${result.text}**\n\n\nTradução: **${result.translated}**`)
    }
}

const traducaoError = (session) => {
    return (error) => {
        let errorMessage = 'Opa, algo deu errado. Tente novamente depois.'
        if(error.message && error.message.indexOf('Access denied') > -1)
            errorMessage += '\n' + error.message
        session.send(errorMessage)
    }
}