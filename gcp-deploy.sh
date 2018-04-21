#!/usr/bin/env bash

kubectl apply -f packages/changelog-gcp/deployment.yaml
kubectl apply -f packages/changelog-gcp/service.yaml
#kubectl apply -f packages/changelog-gcp/certificate.yaml
kubectl apply -f packages/changelog-gcp/ingress.yaml



## get deployment info
#kubectl get service keep-a-changelog
## get ingress info
#kubectl get ingress keep-a-changelog