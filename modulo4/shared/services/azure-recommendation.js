const request = require('request').defaults({ encoding: null })

class AzureRecommendation {

    constructor() {
        this._url = process.env.MICROSOFT_RECOMMENDATION_API_ENDPOINT
        this._key = process.env.MICROSOFT_RECOMMENDATION_API_KEY
        this._modelId = process.env.MICROSOFT_RECOMMENDATION_MODEL_ID
        this._buildId = process.env.MICROSOFT_RECOMMENDATION_BUILD_ID
        this._numberOfResults = process.env.MICROSOFT_RECOMMENDATION_NUMBER_OF_RESULTS
        this._includeMetadata = process.env.MICROSOFT_RECOMMENDATION_INCLUDE_METADATA
    }

    searchRecommendationsByProduct(productId) {
        return new Promise((resolve, reject) => {
            productId = productId.replace(/\s/g, '')
            const payload = {
                url: `${this._url}/models/${this._modelId}/recommend/item?itemIds=${productId}&numberOfResults=${this._numberOfResults}&buildId=${this._buildId}&includeMetadata=${this._includeMetadata}&minimalScore=0`,
                json: true,
                headers: {
                    'Ocp-Apim-Subscription-Key': this._key,
                    'content-type': 'application/json'
                }
            }

            request.get(payload, (error, response, body) => {
                if (error)
                    return reject(error)
                else if (response.statusCode !== 200)
                    return reject(body)
                resolve(Object.assign({productId: productId}, body))
            })
        })
    }

    searchRecommendationsByUser(userId) {
        
    }

}

module.exports = AzureRecommendation