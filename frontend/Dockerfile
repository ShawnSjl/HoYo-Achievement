FROM node:18
LABEL authors="jiale"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "run", "build" ]