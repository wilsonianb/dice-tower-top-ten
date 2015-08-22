docker tag dicetowertopten_webapp quay.io/wilsonianb/dice_tower:$CIRCLE_SHA
docker tag dicetowertopten_webapp quay.io/wilsonianb/dice_tower:$1
docker login --email=$QUAY_EMAIL --username=$QUAY_USERNAME --password=$QUAY_PASSWORD quay.io
docker push quay.io/wilsonianb/dice_tower:$CIRCLE_SHA
docker push quay.io/wilsonianb/dice_tower:$1
