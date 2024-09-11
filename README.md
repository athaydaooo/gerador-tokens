# Repositorio base Node.js


<p>Repositorio com o intuito de server como base para futuros projetos.</p>

<div style="display:flex; flex-direction:column">
  <h4>Conteúdos</h4>
  <a href="#key-features">• Descrição</a>
  <a href="#configuracao">• Configuração</a>
  <a href="#como-usar">• Como usar</a>
  <!-- <a href="#how-to-use">How To Use</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a> -->
</div>
<br/>

[](#key-features)
### Descrição

Os projetos NodeJS usarão, por padrão:

- Prisma - como o ORM para integração com o banco de dados;
- JS/MJS - como linguagem;
- Jest - para testes;
- ESLint e Prettier - para estilização e reforço de estilo de código.

> **Note**
> 
> Essa é a versão completa da estrutura padrão
> Caso o projeto necessite de uma estrutura mais simplificada, acesse a branch: [feature/complete_structure](https://github.com/Vip-Telecom/viptelecom_poc-base-nodejs/tree/feature/simplefied_structure)

[](#configuracao)
### Configuração

Para clonar e rodar essa aplicação, você precisará do [Git](https://git-scm.com), do [Node.js](https://nodejs.org/en/download/) (que vem com o [npm](http://npmjs.com)) e do [VSCode](https://code.visualstudio.com/download) instalados no seu computador. Com eles instalados rode o comando para instalar as dependências:

```bash
npm install
```
ou (caso possua Yarn)
```bash
yarn
```

Depois, configure as variáveis de ambiente do projeto no `.env`, lembrando que todas as variáveis de ambiente devem ter exemplos no `.env.example`.

E então, é necessário configurar as variáveis de ambiente do Prisma, elas devem se encontrar no `.env` dentro da pasta `prisma`. Após isso, rode a migração inicial:

```bash
npm run migrate-dev
```
ou
```bash
yarn migrate-dev
```

Depois, certifique-se de que possuí as dependências do Prettier e ESLint, elas serão recomendadas automaticamente no seu VSCode.

Porém, caso as recomendações não tenham sido exibidas, abaixo as dependências do VSCode necessárias:
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Prettier ESLint](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

[]()
### Como usar

Com as dependências instaladas e o VSCode configurado, você pode rodar o projeto.

> **Note**
> 
> Lembrando que o banco de dados também deve ter sido configurado e as migrações realizadas, usando do Prisma

* Iniciar o projeto (dev)
Em ambiente de desenvolvimento pode-se iniciar o servidor com o nodemon, rode o comando:
```bash
npm run dev
```
ou
```bash
yarn dev
```

* Testes
Para rodarmos os testes use do comando:
```bash
npm run test
```
ou
```bash
yarn test
```
