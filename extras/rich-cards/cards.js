const builder = require('botbuilder')

const HeroCardName = 'hero'
const ThumbnailCardName = 'thumbnail'
const ReceiptCardName = 'receipt'
const SigninCardName = 'sign-in'
const AnimationCardName = 'animation'
const VideoCardName = 'video'
const AudioCardName = 'audio'

const droneImageCard = session => builder.CardImage.create(session, 'https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb')
const droneImageLink = session => builder.CardAction.openUrl(session, 'https://www.pexels.com/photo/action-air-aircraft-aviation-442587/', 'Baixar imagem')
const droneImageSimilarPhotos = session => builder.CardAction.openUrl(session, 'https://www.pexels.com/search/drone/', 'Outras imagens')
const deviceImageCard = session => builder.CardImage.create(session, 'https://images.pexels.com/photos/163096/ios-new-mobile-gadget-163096.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb')
const deviceImageLink = sessin => builder.CardAction.openUrl(session, 'https://images.pexels.com/photos/163096/ios-new-mobile-gadget-163096.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb', 'Baixar imagem')
const deviceImageSimilarPhotos = session => builder.CardAction.openUrl(session, 'https://www.pexels.com/search/iphones/', 'Outras imagens')
const moreInformation = session => builder.CardAction.openUrl(session, 'https://dev.botframework.com/', 'Mais informações')
const techCatCard = session => builder.CardImage.create(session, 'http://4.bp.blogspot.com/_pL4B1Iyb890/SZCX9Ay9MXI/AAAAAAAAASw/OXDrZCo_oCI/s320/cat.kitty.kitten.kittie.sleep.sleepy.cute.lovely.cats.funny.lolcat.fun.computer05.jpg')
const bigBuckLink = session => builder.CardAction.openUrl(session, 'https://peach.blender.org/', 'Saiba mais')
const bigBuckImageCard = session => builder.CardImage.create(session, 'https://peach.blender.org/wp-content/uploads/bbb-splash.png?x11217')
const swImageCard = session => builder.CardImage.create(session, 'http://i0.kym-cdn.com/photos/images/original/000/188/244/SAMPLE-SLIDES.168-e1308532399731.jpg')
const swLink = session => builder.CardAction.openUrl(session, 'http://www.imdb.com/title/tt0080684/', 'Saiba mais')

const createHeroCard = session => {
    return new builder.HeroCard(session)
        .title('Demonstração do Hero Card')
        .subtitle('Subtitulo do card')
        .text('Mensagem do card')
        .images([
            droneImageCard(session)
        ])
        .buttons([
            droneImageLink(session),
            droneImageSimilarPhotos(session)
        ])
}

const createThumbnailCard = session => {
    return new builder.ThumbnailCard(session)
        .title('Demonstração do Thumbnail Card')
        .subtitle('Subtitulo do card')
        .text('Mensagem do card')
        .images([
            droneImageCard(session)
        ])
        .buttons([
            droneImageLink(session)
        ])
}

const createReceiptCard = session => {
    const orderId = (new Date()).getTime()
    return new builder.ReceiptCard(session)
        .title('Demonstração do Receipt Card')
        .facts([
            builder.Fact.create(session, orderId, 'Número do pedido'),
            builder.Fact.create(session, 'MASTER 5396 **** **** **99')
        ])
        .items([
            builder.ReceiptItem.create(session, 'R$ 1.200,00', 'Drone Tipo A')
                .quantity(3)
                .image(droneImageCard(session)),
            builder.ReceiptItem.create(session, 'R$ 4.000,00', 'Telefone')
                .quantity(1)
                .image(deviceImageCard(session))
        ])
        .tax('R$ 980,00')
        .total('R$ 8.580,00')
        .buttons([
            moreInformation(session)
        ])
}

const createSiginCard = session => {
    return new builder.SigninCard(session)
        .text('Demonstração do Sign-in Card')
        .button('Sign-in', 'https://github.com/login')
}

const createAnimationCard = session => {
    return new builder.AnimationCard(session)
        .title('Demonstração do Animation Card')
        .subtitle('Subtitulo do card')
        .image(techCatCard(session))
        .media([
            { url: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif' }
        ])
}

const createVideoCard = session => {
    return new builder.VideoCard(session)
        .title('Demonstração do Video Card')
        .subtitle('Subtitulo do card')
        .text('Mensagem do card')
        .image(bigBuckImageCard(session))
        .media([
            { url: 'http://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4' }
        ])
        .buttons([
            bigBuckLink(session)
        ])
}

const createAudioCard = session => {
    return new builder.AudioCard(session)
        .title('Demonstração do Audio Card')
        .subtitle('Subtitulo do card')
        .text('Mensagem do card')
        .image(swImageCard(session))
        .media([
            { url: 'http://www.wavlist.com/movies/004/father.wav' }
        ])
        .buttons([
            swLink(session)
        ])
}

const create = (selected, session) => {
    switch(selected.trim().toLowerCase()){
        case HeroCardName:
            return createHeroCard(session)
        case ThumbnailCardName:
            return createThumbnailCard(session)
        case ReceiptCardName:
            return createReceiptCard(session)
        case SigninCardName:
            return createSiginCard(session)
        case AnimationCardName:
            return createAnimationCard(session)
        case VideoCardName:
            return createVideoCard(session)
        case AudioCardName:
            return createAudioCard(session)
    }
}

module.exports = {
    CardNames: [HeroCardName, ThumbnailCardName, ReceiptCardName, SigninCardName, AnimationCardName, VideoCardName, AudioCardName],
    Create: create
}