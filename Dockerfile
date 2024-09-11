FROM node:current-alpine

# Criar o diretorio da aplicacao
WORKDIR /usr/src

# Instalar as dependencias da aplicacao
COPY package*.json ./

# Instala as dependencias
RUN yarn install

## Copia os arquivos a partir da raiz do projeto
## para dentro da pasta /usr/src do container
## Vamos ignorar a node_modules por isso criaremos um .dockerignore
COPY . .

# Expor a porta para acesso
EXPOSE 3000
# CMD ["node --es-module-specifier-resolution=node", "src/app.js"]