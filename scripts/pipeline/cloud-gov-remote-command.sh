#!/bin/bash

application=$1
command=$2

export PATH=$PATH:/home/vcap/app/php/bin:/home/vcap/app/vendor/drush/drush

[ -z "${application}" ] || [ -z "${command}" ] && echo "Command error! Valid format: ${0} <application_name> <command>" && exit 1

echo "Running command: '$(echo ${command} | cut -d' ' -f1,2)'..."
{
  cf ssh ${application} -c "${command}"
} >/dev/null 2>&1
