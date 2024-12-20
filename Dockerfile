FROM node:latest
LABEL authors="Roma"


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY web/* web/

EXPOSE 3000

CMD ["npm", "start"]