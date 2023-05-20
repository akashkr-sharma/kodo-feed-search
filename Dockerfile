FROM node:20.1.0-alpine3.17
WORKDIR /app
COPY . .
RUN npm install -g @nestjs/cli
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start:dev"]