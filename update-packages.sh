#!/bin/bash

step=1

echo -e "\n$((step++)). Checking for updates"
ncu --target semver -u

if [ $? -ne 0 ]; then
  echo Failed
  exit 1
fi

if [ $(git status --porcelain package.json | wc -l) -eq 0 ]; then
  echo "No update needed"
  exit 0
fi


echo -e "\n$((step++)). Delete node_modules and package-lock.json"
rm -Rf node_modules package-lock.json

if [ $? -ne 0 ]; then
  echo Failed
  exit 1
fi


echo -e "\n$((step++)). Install node packages"
npm install

if [ $? -ne 0 ]; then
  echo Failed
  exit 1
fi


echo -e "\n$((step++)). Lint project"
npm run lint

if [ $? -ne 0 ]; then
  echo Failed
  exit 1
fi


echo -e "\n$((step++)). Build project"
npm run build

if [ $? -ne 0 ]; then
  echo Failed
  exit 1
fi


echo -e "\n$((step++)). Commit changes"
git commit -a -m "Update node packages"

if [ $? -ne 0 ]; then
  echo Failed
  exit 1
fi


echo -e "\n$((step++)). Push changes to remote repositories"
npm run push

if [ $? -eq 0 ]; then
    echo "Success"
    exit 0
else
    echo "Failed"
    exit 1
fi
