const request = require('request').defaults({ encoding: null })

class CustomVisionApi {

    constructor(endpoint, key) {
        this._endpoint = `${process.env.CUSTOM_VISION_ENDPOINT}`
        this._key = process.env.CUSTOM_VISION_KEY
    }

    findFromStrem(stream) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: `${this._endpoint}/image`,
                encoding: 'binary',
                json: true,
                headers: {
                    'Prediction-Key': this._key,
                    'content-type': 'application/octet-stream'
                }
            }
            stream.pipe(request.post(payload, (error, response, body) => {
                if(error)
                    return reject(error)
                else if (response.statusCode !== 200)
                    return reject(body)
                resolve(body)
            }))
        })
    }

    findFromUrl(url) {
        return new Promise((resolve, reject) => {
            const payload = {
                url: `${this._endpoint}/url`,
                json: { 'Url': url},
                headers: {
                    'Prediction-Key': this._key,
                    'content-type': 'application/json'
                }
            }

            request.post(payload, (error, response, body) => {
                if (error)
                    return reject(error)
                else if (response.statusCode !== 200)
                    return reject(body)
                resolve(body)
            })
        })
    }

}

module.exports = CustomVisionApi