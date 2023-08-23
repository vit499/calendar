FROM node:13.12.0-alpine

ARG API_CITY
ARG API_KEY

ENV REACT_APP_CITY=${API_CITY}
ENV REACT_APP_API_KEY=${API_KEY}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve@13.0.2

#RUN serve -s build -l 3000
