FROM node:10.19.0-alpine

RUN apk add --no-cache python make g++ gcc git && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && apk add --update graphicsmagick && rm -rf /var/cache/apk/*

ADD package.json /tmp/

WORKDIR /app

RUN cd /tmp/ &&  npm install --only=prod && mv /tmp/node_modules /app/node_modules

ADD . /app

RUN cd /app/ && npm run build

EXPOSE 3005/tcp

CMD ["npm", "start"]
