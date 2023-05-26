#/bin/sh

git status

git add .
git commit -m "update proxies"
git pull
git push
# git fetch origin master
# git reset --hard origin/master
# git pull origin master --force