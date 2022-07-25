# 1st time configuration
# add your github creds in github cache
# git config --global credential.helper cache
# git pull add your cred then run this script


########
cd /var/www/UniConn/
service nginx stop
pm2 stop 'npm start'
git pull
cd client/
npm run build
workbox generateSW workbox-generateSW.js
workbox injectManifest
cd ..
pm2 start 'npm start'
service nginx start
pm2 logs
