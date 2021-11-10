FROM node:12.18.3

WORKDIR /usr/src/app

COPY package*.json ./

# ENV MONGO_URL "mongodb://mongo:27017"
ENV MONGODB_URI "mongodb://mongo:27017/testnextmongodb"
ENV WEB_URI "http://localhost:3000"


RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]
