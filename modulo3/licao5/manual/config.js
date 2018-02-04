const builder = require('botbuilder')

const Salgados = [
    {
        value: 'Esfirra',
        synonyms: ['Esfirra', 'Esfira', 'isfirra', 'esfira', 'isfira', 'i']
    },
    {
        value: 'Quibe',
        synonyms: ['Quibe', 'kibe', 'q', 'k']
    },
    {
        value: 'Coxinha',
        synonyms: ['Coxinha', 'cochinha', 'coxa', 'c']
    }
]

const Bebidas = [
    {
        value: 'Água',
        synonyms: ['Água', 'agua', 'h2o', 'a']
    },
    {
        value: 'Refrigerante',
        synonyms: ['Refrigerante', 'Refri', 'r', 'coca']
    },
    {
        value: 'Suco',
        synonyms: ['Suco', 's']
    }
]

const Entrega = [
    'Retirada', 
    {
        value: 'Entrega',
        synonyms: ['Entrega', 'motoboy', 'moto', 'me manda', 'motoca', 'em casa']
    }    
]

module.exports = {
    promptChoiceOptions: {
        listStyle: builder.ListStyle.button,
        retryPrompt: 'Deculpa, não entendi, selecione uma das opções'
    },
    salgados: Salgados,
    bebidas: Bebidas,
    entrega: Entrega
}
