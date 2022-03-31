#!/bin/bash
app=$1
port=$2

cd /root/var/projects/canteen-order
echo $(pwd)
echo $(git pull origin master)

echo $(docker container stop $app)
echo $(docker container rm $app)

docker run -d -it \
-p $port:3000 \
-w /var/projects/canteen-order \
-v /root/var/projects/:/var/projects \
-v /root/var/config:/var/config \
-v /root/var/logs:/var/logs \
--name $app \
node:10.16.3-alpine \
ash -c "npm config set unsafe-perm true && \
npm install --registry=https://registry.npm.taobao.org && \
npm install @nestjs/cli -g --registry=https://registry.npm.taobao.org  &&\
npm install pm2 -g --registry=https://registry.npm.taobao.org &&\
npm run build:$app &&\
NODE_ENV=prod pm2-runtime start dist/apps/$app/apps/$app/src/main.js  --name $app >> /var/logs/canteen-order.manager.$app.log 2>&1"

docker ps -a
