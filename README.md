MaratonaBots
==============

Exemplos de códigos da [Maratona Bots](https://ticapacitacion.com/curso/botspt/) em Node.js utilizando o SDK do [Microsoft BotBuilder](https://github.com/Microsoft/BotBuilder)
 juntamente com o [BotBuilder-CognitiveServices](https://github.com/Microsoft/BotBuilder-CognitiveServices/) e as plataformas:
 * [QnA Maker](https://qnamaker.ai/).
 * [LUIS](https://www.luis.ai/)
 * [Custom Vision](https://customvision.ai/)

### Instalação

1. Faça o clone deste projeto com `git clone https://github.com/vitoravale/MaratonaBots.git`
2. Entre na pasta do projeto e instale as dependências com `npm install`
3. Atualize as chaves dentro do arquivo `.env` na raiz do projeto. 

3. Rode a aplicação utilizando `npm run CÓDIGO`, onde __código__ pode ser:

| Módulo        | Lição           | Código  | Outros |
| :-------------: | :-------------| :-----:| :----- |
| 2 | 2: QnA Maker e Active Learning | m2l2 | |
| 2 | 3: Testando o seu FAQ Bot | m2l3 | |
| 3 | 1: Componentes Multimídia | m3l1 | |
| 3 | 2: Componentes de Navegação e Manipulação de Arquivos | m3l2 | |
| 3 | 3: Ciclo de vida de um diálogo | m3l3 | |
| 3 | 4: Construção de uma API de Dados no Azure | m3l4 | |
| 3 | 5: Construção de um Workflow | m3l5m | Feito de forma manual |
| 3 | 5: Construção de um Workflow | m3l5w | Feito com a biblioteca [dgkanatsios/formflowbotbuilder](https://github.com/dgkanatsios/formflowbotbuilder) | 
| 4 | 1: Visão geral da plataforma | m4l1 | Projeto base para o módulo |
| 4 | 2: LUIS e o processamento de linguagem | m4l2 | |
| 4 | 3: Computer Vision | m4l3 | |
| 4 | 4: Pesquisa e Recomendação | m4l4 | |
| 4 | 5: Localização | m4l5 | |

#### Recuperar as chaves do QnA Maker

Para utilizar o QnA Maker você precisará informar suas **knowledgeBaseId** e **subscriptionKey** dentro do arquivo __.env__, para isto basta acessar sua lista de serviços na plataforma [QnA Maker](https://qnamaker.ai/) e clicar no botão __View Code__ do serviço a ser utilizado, a janela exibda conterá os dados que você precisa utilizar. A imagem abaixo demonstra a posição de cada item na tela.

![Imagem da tela de exemplo de código da plataforma QnA Maker](/images/codigos.png)

#### Recuperar a url do LUIS

Para utilizar o LUIS você precisará informar seu **Endpoint** dentro do arquivo __.env__, para isto basta acessar sua aplicação na plataforma [LUIS](https://www.luis.ai/applications) e acessar a aba __Publish__ do serviço a ser utilizado, no final da página exibida estarão os dadores referentes à __Resources and Keys__, basta copiar a url listada. A imagem abaixo demonstra a posição do item na tela...

![Imagem da tela de exemplo de código da plataforma LUIS](/images/codigos-luis.png)
