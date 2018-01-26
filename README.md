MaratonaBots
==============

Exemplos de códigos da [Maratona Bots](https://ticapacitacion.com/curso/botspt/) em Node.js utilizando o SDK do [Microsoft BotBuilder](https://github.com/Microsoft/BotBuilder)
 juntamente com o [BotBuilder-CognitiveServices](https://github.com/Microsoft/BotBuilder-CognitiveServices/) e a plataforma [QnA Maker](https://qnamaker.ai/).

### Instalação

1. Faça o clone deste projeto com `git clone https://github.com/vitoravale/MaratonaBots.git`
2. Entre na pasta do projeto e instale as dependências com `npm install`
3. Atualize as chaves `QNA_KNOWLEDGE_BASE_ID` e `QNA_SUBSCRIPTION_KEY` dentro do arquivo `.env` na raiz do projeto para que a conexão com o QnA Maker ocorra
3. Rode a aplicação utilizando:
  
Módulo 2 Lição 2: QnA Maker e Active Learning 

```console
npm run m2l2
```

Módulo 2 Lição 3: Testando o seu FAQ Bot

```console
npm run m2l3
```

### Recuperar as chaves do QnA Maker

Você precisará informar sua **knowledgeBaseId** e **subscriptionKey** dentro do arquivo __.env__, para isto basta acessar sua lista de serviços na plataforma [QnA Maker](https://qnamaker.ai/) e clicar no botão __View Code__ do serviço a ser utilizado, a janela exibda conter os dados que você precisa utilizar. A imagem abaixo demonstra a posição de cada item na tela.

![Imagem da tela de exemplo de código da plataforma QnA Maker](/images/codigos.png)

### Módulos extras

Em complemento à lição 3 do módulo 2 onde implementa-se um dos tipos de rich-cards, o HeroCard, existe um exemplo com outros modelos de card disponíveis
```console
npm run rich-cards
```