FROM node:alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app/server

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . /usr/src/app/server

CMD [ "npm", "start" ]