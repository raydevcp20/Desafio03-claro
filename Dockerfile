FROM node:alpine

WORKDIR /desafio04/app

ENV DATABASE_HOST 172.27.224.1
ENV DATABASE_USER root
ENV DATABASE_PASSWORD BHU*nji9
ENV DATABASE_DATABASE copilot

ADD . ${DATABASE_HOST}
ADD . ${DATABASE_USER}
ADD . ${DATABASE_PASSWORD}
ADD . ${DATABASE_DATABASE}

COPY package*.json ./

RUN npm install

COPY db.connection.js ./
COPY script.js ./
COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]
