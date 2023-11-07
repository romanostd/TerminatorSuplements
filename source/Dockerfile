FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install bcrypt

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
