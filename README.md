# Geek Seeker client-side

## Inicializando

Clone este diretório ao rodar ```git clone https://github.com/well-ington/candidates-client-side.git```, depois rode o comando no node ```npm i``` para instalar as dependências.

Depois disso, vá até o arquivo ```src/data/store/actions/actions.ts``` e altere a URL do servidor para o servidor local de testes.

Agora é só executar o ```npm run dev``` para abrir o web-app.

### Scripts

### ```npm start```
Esse script inicia o projeto no modo produção. Essencial para o funcionamento no heroku.

### ```npm run dev```
Abre um servidor com o webpack no modo desenvolvedor. A página será atualizada para cada mudança no código dentro da pasta ```src```.

### ```npm run build```
Gera o código no modo produção usando configurações de produção.

### ```npm test```
Roda todos os testes unitários.

### ```npm run test:watch```
Roda todos os testes unitários e fica no modo "watch", onde o jest irá rodar os testes assim que perceber qualquer mudança.
