INTRODUCTION: https://bit.ly/xbus-cicd
1 - High Level Overview
Tổng quan:  CI/CD được xây dựng để tự động quy trình tích hợp (intergrate) ,cập nhật (delivery), triển khai (deploy)  dự án , từ đó giúp workflow của cả team trở nên nhanh chóng và hiệu quả.

2 - Tech and Installation
Stack:  Gitlab, Gitlab-ci, docker, docker-compose, webhook



Install docker:

sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo systemctl status docker


Install docker-compose:

sudo curl -L https://github.com/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version


Install Webhook (using snapd to get the latest version 2.8):

sudo apt update
sudo apt install snapd
sudo snap install core
sudo snap install webhook


Config running Webhook as service:


- create a file called webhook.service inside /etc/systemd/system
-



3 - CI/CD workflow
 

Workflow:  Khi chúng ta push code lên trên gitlab => CI sẽ chạy qua những Stage này 

Build: build docker image ( tag image version với commit_sha ) và push image lên gitlab registry của project.
Test: dùng image vừa được build chạy lại test case.
Build-prod: tối ưu và build lại image , và push image ( tag image version với commit_sha) lên gitlab registry của project.
Release: dùng image vừa được build ( tag image latest) push lên gitlab registry.
Deploy: 
Gọi đến webhook trong môi trường mà ta muốn deploy
Trên từng môi trường  chúng ta sẽ setup sẵn script.
Webhook sau khi được gọi  ( dựa vào tên id của hooks ) sẽ trigger script run trên môi trường.
Nhiệm vụ chính script => lấy image mới nhất được pub trên registry chạy  lại app.


4 - Example


 Dockerfile
###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16.15.0 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start:dev"]
###################
# BUILD FOR PRODUCTION
###################

FROM node:16.15.0-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build:prod


RUN npm ci --omit=dev && npm cache clean --force

USER node

# ###################
# # PRODUCTION
# ###################

FROM node:16.15.0-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node . .


CMD ["npm","run","prod"]



Gitlab-ci
image: docker:19

workflow:
rules:
- if: '$CI_COMMIT_BRANCH == "main"'

services:
- docker:dind

stages:
- build
- test
- release
- deploy

before_script:
- docker version
- docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

build:
stage: build
script:
- docker pull $CI_REGISTRY_IMAGE:latest || true
- docker build --target development --cache-from $CI_REGISTRY_IMAGE:latest --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
- docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

test:
stage: test
before_script:
- docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
- docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
script:
- docker run $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA npm run test

build-prod:
stage: release
script:
- docker pull $CI_REGISTRY_IMAGE:latest || true
- docker build --cache-from $CI_REGISTRY_IMAGE:latest --tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
- docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA

release:
variables:
GIT_STRATEGY: none
stage: release
script:
- docker pull $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
- docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
- docker push $CI_REGISTRY_IMAGE:latest
needs:
- build-prod

# Deploy curl webhook in main server:
deploy:
stage: deploy
before_script:
- apk update && apk add --no-cache curl
script:
- curl -H "$HEADER_TOKEN" $WEBHOOK_URI

Hook.json
[
{
"id": "test",
"execute-command": "/home/hoangnvs/Desktop/webhook-test/script/redeploy.sh",
"command-working-directory": "/home/hoangnvs/Desktop/webhook-test/",
"response-message": "Deployed...",
"trigger-rule": 
{
"match": {
"type": "value",
"value": "xxx",
"parameter": {
"source": "header",
"name": "X-Gitlab-Token"
}
}
}
}
]


Setup.sh
#!/bin/bash

echo 'pulling'
git pull

echo 'install'
npm install

pkill -9 node

echo 'start'
npm run start




5 - Note
 Tag image built với commit_sha =>  dễ dàng quay lại các version dựa theo commit trong trường hợp lỗi có thể xảy ra.
 Cache dùng trong gitlab-ci để tăng tốc độ build giữa các stage.