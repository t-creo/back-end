DOCKER_IMAGE_NAME="german1608/t-creo:latest"

echo "Building docker image"
docker build  -t $DOCKER_IMAGE_NAME .

echo "Deploying to our docker registry"
echo "$DOCKER_PASSWORD" | docker login -u $DOCKER_USER --password-stdin
docker push $DOCKER_IMAGE_NAME


echo "Deploying to our VPS"
ssh $SSH_HOST_STRING ./deploy.sh
