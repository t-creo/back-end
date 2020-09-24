#!/usr/bin/env bash
# Easy way to pull & run our docker image

DOCKER_IMAGE=german1608/t-creo:latest
DOCKER_CONTAINER=t-creo

docker container rm -f $DOCKER_CONTAINER
docker image rm -f $DOCKER_IMAGE
docker pull $DOCKER_IMAGE
docker run --name $DOCKER_CONTAINER -d --env-file .env -p 3000:3000 $DOCKER_IMAGE
