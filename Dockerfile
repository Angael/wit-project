FROM node:16.16.0-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json yarn.lock /usr/src/app/
COPY client/package.json client/yarn.lock /usr/src/app/client/
RUN yarn install && cd 'client' && yarn install

# Copying source files
COPY . /usr/src/app

# Building app
RUN yarn run build
EXPOSE 3000

# Running the app
CMD "yarn" "run" "start"