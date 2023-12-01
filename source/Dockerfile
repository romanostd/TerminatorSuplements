FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MYSQL_USER=admin
ENV MYSQL_PASSWORD=Ro190620
ENV MYSQL_DATABASE=mydb
ENV MYSQL_HOST=database-1.cesszniu14me.us-east-2.rds.amazonaws.com
ENV MYSQL_PORT=3306
ENV JWT_KEY=secret

EXPOSE 3000

CMD ["npm", "start"]
