FROM node:16

WORKDIR /backend

COPY package*.json ./

RUN npm install && npm install cors express

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
