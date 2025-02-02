FROM node:alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install && npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]