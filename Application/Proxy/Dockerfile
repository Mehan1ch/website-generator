ARG NODE_VERSION=25.1.0
ARG NODE_ENV

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

USER node

COPY . .

EXPOSE 3000

CMD node src/index.ts --watch
