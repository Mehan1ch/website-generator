ARG NODE_VERSION=25.1.0
FROM node:${NODE_VERSION}-alpine

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

EXPOSE 5173

COPY . .

CMD ["npm", "run", "dev"]
