#!/usr/bin/env bash

kubectl apply -f kubernetes/deployment.yaml
kubectl apply -f kubernetes/service.yaml
#kubectl apply -f packages/changelog-gcp/certificate.yaml
kubectl apply -f kubernetes/ingress.yaml



## get deployment info
#kubectl get service keep-a-changelog
## get ingress info
#kubectl get ingress keep-a-changelog