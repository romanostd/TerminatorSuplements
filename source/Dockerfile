FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install bcrypt

COPY . .

ENV MYSQL_HOST=mysql-mariadb
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_DATABASE=ecommerce

EXPOSE 3000

CMD ["npm", "run", "dev"]
