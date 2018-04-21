FROM node:8-alpine

WORKDIR /app
COPY packages/changelog-bot /app

ENV PORT=8080
EXPOSE 8080

CMD npm start