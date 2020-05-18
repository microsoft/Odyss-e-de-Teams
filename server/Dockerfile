FROM node:12

WORKDIR /usr/src/app
COPY . ./

RUN npm install --silent
RUN npm install -g nodemon --silent

RUN chmod +x wait-for-it.sh

EXPOSE 8080

CMD [ "nodemon", "server.js" ]