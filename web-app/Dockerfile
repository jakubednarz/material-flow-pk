FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# COPY . .

ENV CHOKIDAR_USEPOLLING=true
ENV WDS_SOCKET_PORT=0

CMD ["npm", "start"]