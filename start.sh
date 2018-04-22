#!/usr/bin/env bash

git pull --rebase

npm install
npm run l1
npm run l2

docker-compose down -v

#docker-compose up render
docker-compose up -d backend frontend
docker-compose logs -tf --tail=100
