FROM node:22

WORKDIR /mobileclient

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "dev"]
