#!/usr/bin/env bash

kubectl apply -f packages/changelog-gcp/deployment.yaml
kubectl apply -f packages/changelog-gcp/service.yaml

# get deployment info
kubectl get service keep-a-changelog