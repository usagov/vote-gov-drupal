#!/bin/bash

backup_space=$1

export BACKUP_ENV=${CIRCLE_BRANCH}

export backup_folder=$(date "+%Y/%m/%d")
export now=$(date +"%H.%M.%S")

backup_media="cms/public/media"

rm -rf scheduled_backup/

mkdir -p scheduled_backup 
cd scheduled_backup

echo "Downloading media files..."
{
  cf target -s "${cf_space}"

  service="${project}-storage-${BACKUP_ENV}"
  service_key="${service}-key"
  cf delete-service-key "${service}" "${service_key}" -f
  cf create-service-key "${service}" "${service_key}"
  sleep 2
  s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)
  
  export AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
  export bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
  export AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
  export AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')

  rm -rf ${BACKUP_ENV}

  aws s3 sync --no-verify-ssl s3://${bucket}/${backup_media} ${backup_media}/ 2>/dev/null
  tar czvf media_${now}.tar.gz ${backup_media}


  cf delete-service-key "${service}" "${service_key}" -f
} >/dev/null 2>&1

echo "Downloading terraform state..."
{
  cf target -s "${backup_space}"  
  
  service="${project}-terraform-backend"
  service_key="${service}-key"
  cf delete-service-key "${service}" "${service_key}" -f
  cf create-service-key "${service}" "${service_key}"

  sleep 2
  s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)
  
  export AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
  export bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
  export AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
  export AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')

  rm -rf "env:"
  aws s3 cp --recursive  --no-verify-ssl s3://${bucket}/ . 2>/dev/null
  
  tar czf terraform_state_${now}.tar.gz "env:"

  cf delete-service-key "${service}" "${service_key}" -f
} >/dev/null 2>&1

echo "Saving to backup bucket..."
{
  cf target -s "${backup_space}"  
  
  export service="${project}-backup"
  export service_key="${service}-key"
  cf delete-service-key "${service}" "${service_key}" -f
  cf create-service-key "${service}" "${service_key}"
  sleep 2
  
  export s3_credentials=$(cf service-key "${service}" "${service_key}" | tail -n +2)
  
  export AWS_ACCESS_KEY_ID=$(echo "${s3_credentials}" | jq -r '.credentials.access_key_id')
  export bucket=$(echo "${s3_credentials}" | jq -r '.credentials.bucket')
  export AWS_DEFAULT_REGION=$(echo "${s3_credentials}" | jq -r '.credentials.region')
  export AWS_SECRET_ACCESS_KEY=$(echo "${s3_credentials}" | jq -r '.credentials.secret_access_key')

  rm -f backup_${now}.sql
  cp ../backup_${BACKUP_ENV}.sql backup_${now}.sql
  gzip backup_${now}.sql
  
  aws s3 cp ./ s3://${bucket}/${BACKUP_ENV}/${backup_folder} --exclude "*" --include "*.sql.gz" --include "*.tar.gz" --recursive --no-verify-ssl 2>/dev/null

  tar czf latest.tar.gz *.gz

  aws s3 rm s3://${bucket}/${BACKUP_ENV}/latest.tar.gz --no-verify-ssl 2>/dev/null
  aws s3 cp ./latest.tar.gz s3://${bucket}/${BACKUP_ENV}/  --no-verify-ssl 2>/dev/null

  cf delete-service-key "${service}" "${service_key}" -f
} >/dev/null 2>&1
