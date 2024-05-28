cd /var/www/ektesad-front
rm package-lock.json yarn.lock
git pull origin master
npm i
npm run build 
pm2 restart ektesad-front