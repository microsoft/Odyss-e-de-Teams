FROM node:12

WORKDIR /usr/src/app
COPY . ./

RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent

EXPOSE 3000
CMD [ "npm", "start" ]