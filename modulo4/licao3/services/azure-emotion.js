const AzureApi = require('./azure-api')

class AzureEmotion extends AzureApi {

    constructor() {
        const API_URL = `${process.env.MICROSOFT_EMOTION_API_ENDPOINT}/recognize`
        const API_KEY = process.env.MICROSOFT_EMOTION_API_KEY
        super(API_URL, API_KEY)
    }

}

module.exports = AzureEmotion