const builder = require('botbuilder')
const validUrl = require('valid-url')
const AzureEmotion = require('../services/azure-emotion')
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
                builder.Prompts.attachment(session, 'Ok, me envia em ANEXO a imagem a ser analisada')
                break
            default:
                builder.Prompts.text(session, 'Ok, me envia a URL da imagem a ser analisada')
                break
        }
    },
    (session, results) => {
        const emotionServie = new AzureEmotion()
        if(utils.hasImageAttachment(session)){
            const stream = utils.getImageStreamFromMessage(session.message)
            emotionServie.findFromStrem(stream)
                .then(descreverSucces(session))
                .catch(descreverError(session))
        }
        else {
            const imageUrl = utils.parseAnchorTag(session.message.text) || (validUrl.isUri(session.message.text) ? session.message.text : null)
            if(imageUrl){
                emotionServie.findFromUrl(imageUrl)
                    .then(descreverSucces(session))
                    .catch(descreverError(session))
            }
            else {
                session.send('Não consegui identificar a imagem corretamente. Tente novamente.')
            }
        }
    }
]

const getScores = obj => Object.keys(obj).map(key => obj[key])
const getHighestScore = obj => Math.max.apply(null, getScores(obj))
const getMood = (obj, highestScore) => Object.keys(obj).find(key => obj[key] === highestScore)

const descreverSucces = (session) => {
    return (result) => {
        if(!result)
            return session.send('Não consegui descrever essa imagem')
    
        let highestScore
        const moods = result.map((item) => {
            highestScore = getHighestScore(item.scores)
            return getMood(item.scores, highestScore)
        })

        const moodsCount = moods.reduce((p, c) => {
            if(!p.hasOwnProperty(c))
                p[c] = 0
            p[c]++
            return p
        }, {})

        const groupText = Object.keys(moodsCount).map(key => `Achei **${moodsCount[key]}** pessoas que eu identifiquei como **${key}**`).join('\n\n')

        const message = `Eu identifiquei **${moods.length}** pessoas nessa imagem\n\n`
        + `e elas estão **${moods.join(',')}**\n\n`
        + `${groupText}`

        session.send(message)
    }
}

const descreverError = (session) => {
    return (error) => {
        let errorMessage = 'Opa, algo deu errado. Tente novamente depois.'
        if(error.message && error.message.indexOf('Access denied') > -1)
            errorMessage += '\n' + error.message
        console.log(error)
        session.send(errorMessage)
    }
}