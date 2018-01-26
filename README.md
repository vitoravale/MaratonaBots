MaratonaBots
==============

Exemplos de códigos da [Maratona Bots](https://ticapacitacion.com/curso/botspt/) em Node.js utilizando o SDK do [Microsoft BotBuilder](https://github.com/Microsoft/BotBuilder)
 juntamente com o [BotBuilder-CognitiveServices](https://github.com/Microsoft/BotBuilder-CognitiveServices/) e a plataforma [QnA Maker](https://qnamaker.ai/).

### Instalação

1. Faça o clone deste projeto com `git clone https://github.com/vitoravale/MaratonaBots.git`
2. Entre na pasta do projeto e instale as dependências com `npm install`
3. Rode a aplicação utilizando:
  
Módulo 2 Lição 2: QnA Maker e Active Learning 

```console
npm run m2l2
```

Módulo 3 Lição 3: Testando o seu FAQ Bot

```console
npm run m2l3
```

### Configurações necessárias

Você precisará informar sua **knowledgeBaseId** e **subscriptionKey** dentro do arquivo app.js que irá testar, para isto basta acessar sua lista de serviços na plataforma [QnA Maker](https://qnamaker.ai/) e clicar no botão __View Code__, a janela exibda conter os dados que você precisa utilizar. A imagem abaixo demonstra a posição de cada código.

![Imagem da tela de exemplo de código da plataforma QnA Maker](/images/codigos.png)
