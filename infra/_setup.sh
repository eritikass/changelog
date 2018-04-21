#!/usr/bin/env bash

apt-get update

apt-get install -y vim curl wget git

curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential


sudo apt-get remove --purge apache2 apache2-utils
sudo rm -rf /etc/apache2

sudo add-apt-repository ppa:nginx/stable
sudo apt-get update
sudo apt-get install -y nginx