#/bin/sh

git status

git pull
git add .
git commit -m "update proxies"
git push
# git fetch origin master
# git reset --hard origin/master
# git pull origin master --force