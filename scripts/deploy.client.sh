#!/bin/bash
cd app
# yarn build
tar czf app.kenguruka.tar.gz dist
scp -r app.kenguruka.tar.gz kengres@217.25.93.162:~
rm app.kenguruka.tar.gz

ssh kengres@217.25.93.162 << 'ENDSSH'
cd sites/kenguruka/app.kenguruka.ru
rm -rf dist
cd ~/
tar xf app.kenguruka.tar.gz -C sites/kenguruka/app.kenguruka.ru
rm app.kenguruka.tar.gz
# cd sites/kenguruka/app.kenguruka.ru
# yarn install --production
ENDSSH