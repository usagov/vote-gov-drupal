#!/bin/bash

while getopts 'b:de:p:' flag; do
  case "${flag}" in
    b) bucket="${OPTARG}" ;;
    d) delete=1 ;;
    e) environment="${OPTARG}" ;;
    h) help && exit 0 ;;
    p) project="${OPTARG}" ;;
    *) help && exit 1 ;;
  esac
done

if [ -n ${delete} ]; then
  echo "Deleting service key..."
  cf delete-service-key ${service_instance_name} ${key_name} >/dev/null 2>&1
  echo "Done!"
  return
fi

echo "Creating service key..."

{
  service_instance_name=${project}-${bucket}-${environment}
  key_name=${project}-${bucket}-${environment}-key

  cf create-service-key "${service_instance_name}" "${key_name}"
  S3_CREDENTIALS=`cf service-key "${service_instance_name}" "${key_name}" | tail -n +2`

  export AWS_ACCESS_KEY_ID=`echo "${S3_CREDENTIALS}" | jq -r .credentials.access_key_id`
  export AWS_SECRET_ACCESS_KEY=`echo "${S3_CREDENTIALS}" | jq -r .credentials.secret_access_key`
  export BUCKET_NAME=`echo "${S3_CREDENTIALS}" | jq -r .credentials.bucket`
  export AWS_DEFAULT_REGION=`echo "${S3_CREDENTIALS}" | jq -r '.credentials.region'`
} >/dev/null 2>&1

echo "Done!"
