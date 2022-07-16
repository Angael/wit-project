# deps
FROM node:16.16.0-alpine AS deps

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY client/package.json /usr/src/app/client/

RUN yarn install && cd 'client' && yarn install

# prod image
FROM node:16.16.0-alpine
ENV PORT 3000

WORKDIR /usr/src/app

COPY . /usr/src/app
COPY --from=deps /usr/src/app/ /usr/src/app/

RUN yarn run build
EXPOSE 3000

CMD "yarn" "run" "start"