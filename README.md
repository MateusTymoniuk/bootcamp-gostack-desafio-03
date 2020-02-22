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

2 - Definir as variáveis de ambiente:

  - Usando como modelo o arquivo **.env.example** criar na mesma pasta um arquivo **.env** e definir a série de **variáveis de ambiente** a seguir:

        AUTH_SECRET (segredo da autenticação por algoritmo md5)

    O md5 pode ser obtido <a href="https://www.md5online.org/">aqui</a> ou <a href="https://www.md5hashgenerator.com/">aqui</a>;

  - Variáveis de ambiente necessárias para os esquemas de conexão com o banco de dados:

        DB_HOST (url do servidor de banco de dados)
        DB_PORT (porta de acesso, vazio assume porta padrão conforme o banco de dados)
        DB_NAME (nome do banco de dados)
        DB_USER (nome do usuário do banco de dados)
        DB_PASS (senha do usuário)

  - Variáveis de ambiente necessárias para a conexão com o servidor de emails:

        MAIL_HOST (url do servidor de emails)
        MAIL_PORT (porta de acesso)
        MAIL_SECURE (se vai utilizar SSL para os envios - isso requer portas específicas)
        MAIL_USER (nome do usuário do servidor de emails)
        MAIL_PASS (senha do usuário)

  - Variáveis de ambiente necessárias para a conexão com o sentry (não é obrigatório para a aplicação rodar):

        SENTRY_DSN (url onde serão enviadas informações ao sentry)

3 - **Configurar as variáveis do docker**:

  - Para utilizar os containers do postgres e do redis, basta ir no arquivo docker-compose.yml, e preencher as variáveis, com os mesmos valores das variáveis do item anterior:

      POSTGRES_USER (nome do usuário do banco de dados - como cadastrado na DB_USER)
      POSTGRES_PASSWORD (nome do usuário - como cadastrado na DB_PASS)
      POSTGRES_DB (nome do banco de dados - como cadastrado na DB_NAME)

4 - **Subir os containeres docker do postgres e do redis** digitando no terminal o comando:

    docker-compose up

5 - **Instalar as dependências do projeto** digitando no terminal o comando:

    npm install

6 - **Aplique as migrations para criar as tabelas no banco de dados**. No terminal da aplicação digite:

    npx sequelize db:migrate

  O comando acima assume por padrão: `npx sequelize db:migrate --env "development"`

7 - **Aplique o seed para incluir o usuário administrador** inicial:

    npx sequelize db:seed:all

8 - Para **executar a aplicação** utilize:

    npm run dev:queue

Ou, caso queira rodar a aplicação e a fila em terminais separados, faça:

    npm run dev
    npm run queue

ou, no caso de depurar:

    npm run dev:debug
    npm run queue
