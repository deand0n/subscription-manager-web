FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

RUN rm -rf src/ static/ docker-compose.yml

RUN npm run migrate:up

# USER node:node
EXPOSE 3000

CMD ["node","build/index.js"]