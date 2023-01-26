FROM node:16-alpine

RUN apk add g++ make py3-pip

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm ci
RUN npm install -g nx@14.8.6
RUN nx build ocean

EXPOSE 4302
CMD [ "npx", "serve", "-l", "4302", "./dist/apps/ocean"]