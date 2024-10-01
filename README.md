# Gerador de tokens API

Serviço de gestão de tokens para validação de meio de comunicação

</div>


<div align="center">
<h4>
<a href="#features">Features</a> • 
<a href="#instalação">Instalação</a> • 
<a href="#sobre-o-autor">Sobre o Autor</a> • 
<a href="#sobre-o-projeto">Sobre o Projeto</a> • 
<a href="#licença">Licença</a>
</h4>
</div>


## Features

- [x] Geração de tokens
- [x] Validação de tokens
- [x] Envio de tokens por e-mail
- [x] Documentação com Swagger
- [x] Testes unitários com Jest
- [x] Padronização de código com ESLint
- [x] Banco de dados com Prisma
- [x] Containerização com Docker
- [x] Ambiente de desenvolvimento padronizado com ESLint
- [x] Comunicação simplificada com Axios
- [x] Segurança com CORS

## Instalação

1. **Clone o repositório**:
   - Clone o projeto para o seu ambiente local:
     ```bash
     git clone https://github.com/athaydaooo/gerador-tokens.git
     ```

2. **Acesse o diretório do projeto**:
   - Navegue até o diretório do projeto clonado:
     ```bash
     cd gerador-tokens
     ```

3. **Configuração das variáveis de ambiente**:
   - Crie um arquivo `.env` no diretório raiz do projeto e configure as variáveis de ambiente necessárias (por exemplo, informações de banco de dados, tokens de API, etc).

4. **Instale as dependências**:
   - Com **npm**:
     ```bash
     npm install
     ```
   - Ou com **yarn**:
     ```bash
     yarn install
     ```

5. **Rodar a aplicação com Docker**:
   - Levante os containers necessários com o comando:
     ```bash
     docker-compose up -d
     ```

Agora a aplicação estará rodando e pronta para uso.

## Sobre o Projeto

Esta API é responsável por gerar, verificar e enviar tokens para validar a autenticidade dos meios de comunicação. Utilizando TypeScript e Node.js para lógica do backend, a aplicação garante robustez com Express e validações estruturadas com Zod. A comunicação entre serviços é simplificada com Axios, enquanto o CORS garante segurança nas permissões de acesso. O banco de dados é gerenciado com Prisma, garantindo uma integração eficiente e escalável. A documentação é gerada automaticamente com Swagger, garantindo clareza e acessibilidade. A aplicação é containerizada com Docker, facilitando o deployment e o ambiente de desenvolvimento é rigorosamente padronizado com ESLint e testado com Jest.



## Sobre o Autor

**Lucas Athayde**

Este projeto foi criado por Lucas Athayde. Conecte-se comigo no [GitHub](https://github.com/) para aprender sobre minha jornada profissional.


## Licença

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).


<p align="right"><a href="#readme-top">(Voltar ao inicio)</a></p>
