#!/usr/bin/env bash

docker build -t eritikass/changelog:latest .
docker push eritikass/changelog:latest


# kubectl create configmap bot-private-key  --from-file=changelogbot-private-key.pem
# kubectl apply -f kubernetes/config.yaml
# docker run --rm -e "APP_ID=11336" -e "WEBHOOK_SECRET=Development" -e "PRIVATE_KEY=${PRIVATE_KEY}" -p "8080:8080" eritikass/changelog

kubectl apply -f infra/deployment.yaml
kubectl apply -f infra/service.yaml
#kubectl apply -f infra/certificate.yaml
kubectl apply -f infra/ingress.yaml



## get deployment info
#kubectl get service keep-a-changelog
## get ingress info
#kubectl get ingress keep-a-changelog