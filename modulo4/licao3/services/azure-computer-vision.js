const AzureApi = require('./azure-api')

class AzureComputerVision extends AzureApi {

    constructor() {
        const API_URL = `${process.env.MICROSOFT_VISION_API_ENDPOINT}/analyze?visualFeatures=Categories,Tags,Description,Faces,ImageType,Color,Adult`
        const API_KEY = process.env.MICROSOFT_VISION_API_KEY
        super(API_URL, API_KEY)
    }

}

module.exports = AzureComputerVision
