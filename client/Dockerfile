FROM node:alpine

RUN mkdir -p /usr/src/app/client
ENV PORT 3000

WORKDIR /usr/src/app/client

COPY package.json /usr/src/app/client
COPY yarn.lock /usr/src/app/client

RUN yarn install

COPY . /usr/src/app/client

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]