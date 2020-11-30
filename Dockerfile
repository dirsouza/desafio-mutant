FROM node:lts-alpine
RUN apk add --no-cache openssl
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
WORKDIR /usr/src/api
COPY package*.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD dockerize -wait tcp://mutant-db:3306 -timeout 40s yarn start:prod
