#! /bin/bash

export SECRETS=$(echo $VCAP_SERVICES | jq -r '.["user-provided"][] | select(.name == "secrets") | .credentials')
export SECAUTHSECRETS=$(echo $VCAP_SERVICES | jq -r '.["user-provided"][] | select(.name == "secauthsecrets") | .credentials')

export APP_NAME=$(echo $VCAP_APPLICATION | jq -r '.name')
export APP_ROOT=$(dirname "$0")
export APP_ID=$(echo "$VCAP_APPLICATION" | jq -r '.application_id')

export DB_NAME=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.db_name')
export DB_USER=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.username')
export DB_PW=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.password')
export DB_HOST=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.host')
export DB_PORT=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.port')

export ADMIN_EMAIL=$(echo $SECRETS | jq -r '.ADMIN_EMAIL')

export ENV=$(echo "$VCAP_APPLICATION" | jq -r '.space_name' | rev | cut -d- -f1 | rev)
 
export S3_BUCKET=$(echo "$VCAP_SERVICES" | jq -r '.["s3"][]? | select(.name == "storage") | .credentials.bucket')
export S3_ENDPOINT=$(echo "$VCAP_SERVICES" | jq -r '.["s3"][]? | select(.name == "storage") | .credentials.fips_endpoint')

export SPACE=$(echo $VCAP_APPLICATION | jq -r '.["space_name"]')
export WWW_HOST=${WWW_HOST:-$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | grep 'beta\|www' | tr '\n' ' ')}
export CMS_HOST=${CMS_HOST:-$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | grep cms | tr '\n' ' ')}
if [ -z "$WWW_HOST" ]; then
  export WWW_HOST="*.app.cloud.gov"
elif [ -z "$CMS_HOST" ]; then
  export CMS_HOST=$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | head -n 1)
fi

export S3_ROOT_WEB=${S3_ROOT_WEB:-/web}
export S3_ROOT_CMS=${S3_ROOT_CMS:-/cms/public}
export S3_HOST=${S3_HOST:-$S3_BUCKET.$S3_ENDPOINT}
export S3_PROXY_WEB=${S3_PROXY_WEB:-$S3_HOST$S3_ROOT_WEB}
export S3_PROXY_CMS=${S3_PROXY_CMS:-$S3_HOST$S3_ROOT_CMS}
export S3_PROXY_PATH_CMS=${S3_PROXY_PATH_CMS:-/s3/files}

export DNS_SERVER=${DNS_SERVER:-$(grep -i '^nameserver' /etc/resolv.conf|head -n1|cut -d ' ' -f2)}

# export EN_404_PAGE=${EN_404_PAGE:-/page-error/index.html};
# export ES_404_PAGE=${ES_404_PAGE:-/es/pagina-error/index.html};

# export NEW_RELIC_DISPLAY_NAME=${NEW_RELIC_DISPLAY_NAME:-$(echo $SECRETS | jq -r '.NEW_RELIC_DISPLAY_NAME')}
# export NEW_RELIC_APP_NAME=${NEW_RELIC_APP_NAME:-$(echo $SECRETS | jq -r '.NEW_RELIC_APP_NAME')}
# export NEW_RELIC_API_KEY=${NEW_RELIC_API_KEY:-$(echo $SECRETS | jq -r '.NEW_RELIC_API_KEY')}
# export NEW_RELIC_LICENSE_KEY=${NEW_RELIC_LICENSE_KEY:-$(echo $SECRETS | jq -r '.NEW_RELIC_LICENSE_KEY')}