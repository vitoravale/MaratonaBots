const builder = require('botbuilder')
const validUrl = require('valid-url')
const AzureRecommendation = require('../services/azure-recommendation')
const utils = require('../utils')

module.exports = [
    (session, args, next) => {
        const produto = builder.EntityRecognizer.findEntity(args.entities, 'produto')
        if(produto && produto.entity && !!produto.entity.length){
            new AzureRecommendation().searchRecommendationsByProduct(produto.entity)
                .then(recomendarSucesso(session))
                .catch(recomendarErro(session))
        }
        else {
            builder.Prompts.text(session, '**(ಥ﹏ಥ)** - Por favor, me informe apenas o **código do produto**...')
        }
    },
    (session, results) => {
        new AzureRecommendation().searchRecommendationsByProduct(results.response)
                .then(recomendarSucesso(session))
                .catch(recomendarErro(session))
    }
]

const recommendationPattern = r => `- Id: **${r.id}** item: **${r.name}**`
const recommendationParser = recommendation => recommendation.items.map(recommendationPattern)

const recomendarSucesso = (session) => {
    return (result) => {
        const message = !result.recommendedItems.length
            ? `Nenhuma recomendação encontrada para ${result.productId}`
            : `Minhas sugestões são\n\n${result.recommendedItems.map(recommendationParser).join('\n\n')}`
        session.send(message)
        session.endDialog()
    }
}

const recomendarErro = (session) => {
    return (error) => {
        let errorMessage = 'Opa, algo deu errado. Tente novamente depois.'
        if(error.message && error.message.indexOf('Access denied') > -1)
            errorMessage += '\n' + error.message
        session.send(errorMessage)
    }
}