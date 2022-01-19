#!/bin/bash
cd app
yarn build
tar czf finances.kenguruka.tar.gz dist
scp -r finances.kenguruka.tar.gz kengres@217.25.93.162:~
rm finances.kenguruka.tar.gz

ssh kengres@217.25.93.162 << 'ENDSSH'
cd sites/kenguruka/finances.kenguruka.ru
rm -rf dist
cd ~/
tar xf finances.kenguruka.tar.gz -C sites/kenguruka/finances.kenguruka.ru
rm finances.kenguruka.tar.gz
ENDSSH