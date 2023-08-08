# TerminatorSuplementos
Um e-commerce de suplementos , usando Angular e Node com Express,

para rodar o backend com knex:

- instale postgrees, e configure o arquivo "knexfile.js" de acordo com o banco de dados que você criar.

- primeiro instale node, depois instale o knex globalmente -> npm install knex --save -g.

- rode o comando "npm i", no diretorio "backend" do projeto, para instalar as dependencias do backend.

- rode o comando "knex migrate:latest", ele criara as tabelas de acordo com as migrations do projeto.

- e por fim, para levantar o backend, rode o comando "npm start"

=========================================================================================

para rodar o backend com docker:

- primeiro instale node

- rode o comando "npm i", no diretorio "source" do projeto, para instalar as dependencias do backend.

- instale docker

- docker pull mariadb

- docker run -p 3306:3306 --name mysql-mariadb -e MYSQL_ROOT_PASSWORD=your password -d mariadb

- instalar mysql workbench

- usar modelo de banco de dados disponivel no repositorio para montar as tabelas.

- e por fim, para levantar o backend, rode o comando "npm start"

=========================================================================================

para rodar o frontend:

- com o node instalado, rode o comando "npm i" no diretorio "frontend" do projeto, para instalar as dependencias do frontend.

- rode o comando "npm install -g @angular/cli" no diretorio "frontend" do projeto, para instalar o angular.

- e por fim, para levantar o frontend, rode o comando "ng serve"

- possivel erro : 0308010C:digital envelope routines::unsupported

- solução : rode o seguinte comando ->set NODE_OPTIONS=--openssl-legacy-provider
