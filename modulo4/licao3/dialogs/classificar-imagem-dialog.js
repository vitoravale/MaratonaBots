const builder = require('botbuilder')
const validUrl = require('valid-url')
const CustomVision = require('../services/custom-vision-api')
const utils = require('../utils')

module.exports = [
    (session, args, next) => {
        const options = {
            listStyle: builder.ListStyle.button,
            retryPrompt: 'Deculpa, não entendi, selecione uma das opções'
        }
        builder.Prompts.choice(
            session,
            'Como você deseja me enviar a imagem?',
            ['URL', 'Anexo'],
            options
        )
    },
    (session, results) => {
        switch(results.response.index){
            case 1:
                builder.Prompts.attachment(session, 'Me envia uma imagem em ANEXO que eu te direi o que ela é')
                break
            default:
                builder.Prompts.text(session, 'Me envia a URL de uma imagem que eu te direi o que ela é')
                break
        }
    },
    (session, results) => {
        const customVisionService = new CustomVision()
        if(utils.hasImageAttachment(session)){
            const stream = utils.getImageStreamFromMessage(session.message)
            customVisionService.findFromStrem(stream)
                .then(descreverSucces(session))
                .catch(descreverError(session))
        }
        else {
            const imageUrl = utils.parseAnchorTag(session.message.text) || (validUrl.isUri(session.message.text) ? session.message.text : null)
            if(imageUrl){
                customVisionService.findFromUrl(imageUrl)
                    .then(descreverSucces(session))
                    .catch(descreverError(session))
            }
            else {
                session.send('Não consegui identificar a imagem corretamente. Tente novamente.')
            }
        }
    }
]

const descreverSucces = (session) => {
    return (result) => {
        if(!result)
            return session.send('Não consegui descrever essa imagem')
        const highestProbability = Math.max.apply(null, result.Predictions.map(p => p.Probability))
        const prediction = result.Predictions.find(p => p.Probability === highestProbability)
        const message = `Eu identifiquei um objeto do tipo **${prediction.Tag}** na imagem, com **${prediction.Probability * 100}%** de acertividade.`    
        session.send(message)
    }
}

const descreverError = (session) => {
    return (error) => {
        let errorMessage = 'Opa, algo deu errado. Tente novamente depois.'
        if(error.message && error.message.indexOf('Access denied') > -1)
            errorMessage += '\n' + error.message
        session.send(errorMessage)
    }
}