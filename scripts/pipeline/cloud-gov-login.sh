#!/bin/bash

echo "Logging into Cloud.gov..."
{
  cf login \
    -a https://api.fr.cloud.gov \
    -u ${cloudgov_username} \
    -p ${cloudgov_password} \
    -o ${cf_org} \
    -s ${cf_space} > login.log || login_error=1
} >/dev/null 2>&1

[ -n "${login_error}" ] && echo "Error logging into Cloud.gov!" && exit 1

echo "Login successful!"