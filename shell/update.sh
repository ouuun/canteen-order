app=$1
cd /root/var/projects/canteen-order
git pull origin master
docker exec $app /bin/sh -c " npm install --registry=https://registry.npm.taobao.org && \
npm run build:$app && \
pm2 reload $app"



