#!/bin/bash
tar czf api.kenguruka.tar.gz api server.js package.json yarn.lock
scp -r api.kenguruka.tar.gz kengres@217.25.93.162:~
rm api.kenguruka.tar.gz

ssh kengres@217.25.93.162 << 'ENDSSH'
pm2 stop kenguruka.api
cd sites/kenguruka/api.kenguruka.ru
rm -rf api server.js package.json yarn.lock
cd ~/
# rm -rf sites/kenguruka/api.kenguruka.ru/*
tar xf api.kenguruka.tar.gz -C sites/kenguruka/api.kenguruka.ru
rm api.kenguruka.tar.gz
cd sites/kenguruka/api.kenguruka.ru
yarn install --production
pm2 restart kenguruka.api
ENDSSH