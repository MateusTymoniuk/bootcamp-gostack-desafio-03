<img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" style="max-width:100%;">

# Desafio 2: FastFeet, continuando a aplicação
⚠️ Etapa 2/4 do Desafio Final ⚠️


<p align="center">
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


## 🚀 **Sobre**
Aplicação Node.js com cadastro e autenticação de usuários e cadastro de destinatários.

Desafio proposto em: https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/README.md

## 🚀 **Instalação**
1 - Clonar o <a href="https://github.com/MateusTymoniuk/bootcamp-gostack-desafio-03">repositório</a> em seu computador;

2 - Alterar o arquivo **config.json** e definir os campos abaixo de acordo com a **configuração de conexão ao banco de dados** desejada:

    username
    password
    database
    host
    port
    dialect

3 - **Instalar as dependências do projeto** digitando no terminal o comando:

    npm install

4 - Nos seus GDBs que for usar, **crie os bancos de dados, e para cada banco, o respectivo usuário com as permissões de acesso necessárias**;

5 - **Aplique as migrations para criar as tabelas no banco de dados**. No terminal da aplicação digite:

    npx sequelize db:migrate

  O comando acima assume por padrão: `npx sequelize db:migrate --env "development"`

6 - **Aplique o seed para incluir o usuário administrador** inicial:

    npx sequelize db:seed:all

7 - Para **executar a aplicação** utilize:

    npm run dev

ou, no caso de depurar:

    npm run dev:debug
