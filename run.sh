#!/bin/bash
sudo npm install
cd bnb
sudo npm install
cd ..
sudo npm run build
pm2 restart server