#!/bin/bash

CF_ENV=$1

if [ "${CF_ENV}" == "prod" ]; then
  export CF_USERNAME=${CF_USERNAME_PROD}
  export CF_PASSWORD=${CF_PASSWORD_PROD}
  export CF_SPACE=${CF_SPACE_PROD}
  export DRUPAL_MEMORY=${DRUPAL_MEMORY_PROD}
elif [ "${CF_ENV}" == "stage" ]; then
  export CF_USERNAME=${CF_USERNAME_STAGE}
  export CF_PASSWORD=${CF_PASSWORD_STAGE}
  export CF_SPACE=${CF_SPACE_STAGE}
  export DRUPAL_MEMORY=${DRUPAL_MEMORY_STAGE}
elif [ "${CF_ENV}" == "test" ]; then
  export CF_USERNAME=${CF_USERNAME_DEV}
  export CF_PASSWORD=${CF_PASSWORD_DEV}
  export CF_SPACE=${CF_SPACE_DEV}
  export DRUPAL_MEMORY=${DRUPAL_MEMORY_DEV}
elif [ "${CF_ENV}" == "dev" ]; then
  export CF_USERNAME=${CF_USERNAME_DEV}
  export CF_PASSWORD=${CF_PASSWORD_DEV}
  export CF_SPACE=${CF_SPACE_DEV}
  export DRUPAL_MEMORY=${DRUPAL_MEMORY_DEV}
fi

echo "Logging into Cloud.gov..."
{
  cf login \
    -a https://api.fr.cloud.gov \
    -u ${CF_USERNAME} \
    -p ${CF_PASSWORD} \
    -o ${CF_ORG} \
    -s ${CF_SPACE} > login.log || login_error=1
} 2>&1 >/dev/null

[ -n "${login_error}" ] && echo "Error logging into Cloud.gov!" && exit 1

echo "Login successful!"