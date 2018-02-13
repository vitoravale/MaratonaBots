const request = require('request').defaults({ encoding: null })
const fastXmlParser = require('fast-xml-parser')

class AzureTranslate {

    constructor(endpoint, key) {
        this._endpoint = `${process.env.MICROSOFT_TRANSLATE_API_ENDPOINT}`
        this._key = process.env.MICROSOFT_TRANSLATE_API_KEY
    }

    translateText(text, to, from) {
        to = to || 'pt-br'
        
        return new Promise((resolve, reject) => {
            const payload = {
                url: `${this._endpoint}?text=${encodeURI(text)}&to=${to}`,
                json: true,
                headers: {
                    'Ocp-Apim-Subscription-Key': this._key,
                    'content-type': 'text/xml'
                }
            }

            if(from && !!from.length)
                payload.url += `&from=${from}`

            request.get(payload, (error, response, body) => {
                if(error)
                    return reject(error)
                else if (response.statusCode !== 200)
                    return reject(body.toString('utf8'))

                const parsed = fastXmlParser.parse(body.toString('utf8'))

                resolve({
                    text: text,
                    translated: parsed && parsed.string
                })
            })
        })
    }

}

module.exports = AzureTranslate