FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install -g json-server

COPY . .

EXPOSE 4000

CMD ["json-server", "--watch", "db.json", "--port", "4000"]
