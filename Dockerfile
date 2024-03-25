FROM node:19.03.0-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

