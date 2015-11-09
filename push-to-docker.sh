docker tag dicetowertopten_webapp wilsonianb/dice_tower:$CIRCLE_SHA
docker tag dicetowertopten_webapp wilsonianb/dice_tower:$1
docker login --email=$DOCKER_EMAIL --username=$DOCKER_USERNAME --password=$DOCKER_PASSWORD
docker push wilsonianb/dice_tower:$CIRCLE_SHA
docker push wilsonianb/dice_tower:$1
