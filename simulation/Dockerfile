FROM node:16

WORKDIR /simulation

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
