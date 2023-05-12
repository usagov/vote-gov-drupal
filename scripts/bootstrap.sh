#!/bin/bash
set -uo pipefail

## Export proxy servers.
export http_proxy=$(echo ${VCAP_SERVICES} | jq -r '."user-provided"[].credentials.proxy_uri')
export https_proxy=$(echo ${VCAP_SERVICES} | jq -r '."user-provided"[].credentials.proxy_uri')

home="/home/vcap"
app_path="${home}/app"

rm -rf ${app_path}/newrelic/agent
ln -s ${home}/deps/0/apt/usr/lib/newrelic-php5/agent ${app_path}/newrelic/agent

rm -f ${app_path}/newrelic/daemon/newrelic-daemon.x64
ln -s ${home}/deps/0/apt/usr/bin/newrelic-daemon ${app_path}/newrelic/daemon/newrelic-daemon.x64

rm -f ${app_path}/newrelic/scripts/newrelic-iutil.x64
ln -s ${app_path}/newrelic/scripts/newrelic-iutil.x64 ${home}/deps/0/apt/usr/lib/newrelic-php5/scripts/newrelic-iutil.x64

if [ -z "${VCAP_SERVICES:-}" ]; then
    echo "VCAP_SERVICES must a be set in the environment: aborting bootstrap";
    exit 1;
fi

if [ ! -f ./container_start_timestamp ]; then
  touch ./container_start_timestamp
  chmod a+r ./container_start_timestamp
  echo "$(date +'%s')" > ./container_start_timestamp
fi

SECRETS=$(echo $VCAP_SERVICES | jq -r '.["user-provided"][] | select(.name == "secrets") | .credentials')
SECAUTHSECRETS=$(echo $VCAP_SERVICES | jq -r '.["user-provided"][] | select(.name == "secauthsecrets") | .credentials')

APP_NAME=$(echo $VCAP_APPLICATION | jq -r '.name')
APP_ROOT=$(dirname "$0")
APP_ID=$(echo "$VCAP_APPLICATION" | jq -r '.application_id')

DB_NAME=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.db_name')
DB_USER=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.username')
DB_PW=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.password')
DB_HOST=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.host')
DB_PORT=$(echo $VCAP_SERVICES | jq -r '.["aws-rds"][] | .credentials.port')

ADMIN_EMAIL=$(echo $SECRETS | jq -r '.ADMIN_EMAIL')

export ENV=$(echo "$VCAP_APPLICATION" | jq -r '.space_name' | rev | cut -d- -f1 | rev)
 
export S3_BUCKET=$(echo "$VCAP_SERVICES" | jq -r '.["s3"][]? | select(.name == "storage") | .credentials.bucket')
export S3_ENDPOINT=$(echo "$VCAP_SERVICES" | jq -r '.["s3"][]? | select(.name == "storage") | .credentials.fips_endpoint')

SPACE=$(echo $VCAP_APPLICATION | jq -r '.["space_name"]')
#WWW_HOST=${WWW_HOST:-$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | grep 'beta\|www' | head -n 1)}
#CMS_HOST=${CMS_HOST:-$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | grep cms  | head -n 1)}
WWW_HOST=${WWW_HOST:-$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | grep 'beta\|www' | tr '\n' ' ')}
CMS_HOST=${CMS_HOST:-$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | grep cms | tr '\n' ' ')}
if [ -z "$WWW_HOST" ]; then
  export WWW_HOST="*.app.cloud.gov"
fi
if [ -z "$CMS_HOST" ]; then
  export CMS_HOST=$(echo $VCAP_APPLICATION | jq -r '.["application_uris"][]' | head -n 1)
fi

export S3_ROOT_WEB=${S3_ROOT_WEB:-/web}
export S3_ROOT_CMS=${S3_ROOT_CMS:-/cms/public}
export S3_HOST=${S3_HOST:-$S3_BUCKET.$S3_ENDPOINT}
export S3_PROXY_WEB=${S3_PROXY_WEB:-$S3_HOST$S3_ROOT_WEB}
export S3_PROXY_CMS=${S3_PROXY_CMS:-$S3_HOST$S3_ROOT_CMS}
export S3_PROXY_PATH_CMS=${S3_PROXY_PATH_CMS:-/s3/files}

# export DNS_SERVER=${DNS_SERVER:-$(grep -i '^nameserver' /etc/resolv.conf|head -n1|cut -d ' ' -f2)}

# export EN_404_PAGE=${EN_404_PAGE:-/page-error/index.html};
# export ES_404_PAGE=${ES_404_PAGE:-/es/pagina-error/index.html};

# export NEW_RELIC_DISPLAY_NAME=${NEW_RELIC_DISPLAY_NAME:-$(echo $SECRETS | jq -r '.NEW_RELIC_DISPLAY_NAME')}
# export NEW_RELIC_APP_NAME=${NEW_RELIC_APP_NAME:-$(echo $SECRETS | jq -r '.NEW_RELIC_APP_NAME')}
# export NEW_RELIC_API_KEY=${NEW_RELIC_API_KEY:-$(echo $SECRETS | jq -r '.NEW_RELIC_API_KEY')}
# export NEW_RELIC_LICENSE_KEY=${NEW_RELIC_LICENSE_KEY:-$(echo $SECRETS | jq -r '.NEW_RELIC_LICENSE_KEY')}

dirs=( "${HOME}/private" "${HOME}/web/sites/default/files" )

for dir in $dirs; do
  if [ ! -d $dir ]; then
    echo "Creating ${dir} directory ... "
    mkdir $dir
    chown vcap. $dir
  fi
done

# mkdir -p ${home}/tmp/newrelic/
# newrelic_ini="${home}/deps/0/apt/usr/lib/newrelic-php5/scripts/newrelic.ini"
# cp ${newrelic_ini}.template ${newrelic_ini}
# sed -i "s/;newrelic.enabled = true/newrelic.enabled = true/" ${newrelic_ini}
# sed -i "s#/var/log/#${home}/tmp/#g" ${newrelic_ini}
# sed -i "s/REPLACE_WITH_REAL_KEY/${newrelic_key}/" ${newrelic_ini}
# sed -i "s/newrelic.appname[[:space:]]=[[:space:]].*/newrelic.appname=\"${APP_NAME}\"/" ${newrelic_ini}
# sed -i 's/;newrelic.loglevel = "info"/newrelic.loglevel = "debug"/' ${newrelic_ini}
# mv ${newrelic_ini} ${app_path}/php/etc/php.ini.d/

# export newrelic_so=$(find ${home} | grep -e newrelic.*\.so | sort -r | head -1)
# export newrelic_so_file=$(basename ${newrelic_so})
# export php_so_path=$(dirname $(find ${app_path} | grep php | grep -e "\.so" | grep "no-debug-non-zts" | head -1))
# ln -s $newrelic_so ${php_so_path}/newrelic.so

# newrelic_cfg="${home}/deps/0/apt/etc/newrelic/newrelic.cfg"
# cp ${newrelic_cfg}.template ${newrelic_cfg}
# sed -i "s,/var/log/,${home}/tmp/,g" ${newrelic_cfg}
# sed -i "s,#loglevel=info,loglevel=debug," ${newrelic_cfg}
# sed -i "s,#address=\"/tmp/.newrelic.sock\",address=\"${home}/tmp/.newrelic.sock\"" ${newrelic_cfg}
# sed -i "/#logfile/s/^#//" ${newrelic_cfg}
# cp ${newrelic_cfg} ${app_path}

## Updated ~/.bashrc to update $PATH when someone logs in.
[ -z $(cat ${home}/.bashrc | grep PATH) ] && \
  touch ${home}/.bashrc && \
  echo "export http_proxy=${http_proxy}" >> ${home}/.bashrc && \
  echo "export https_proxy=${https_proxy}" >> ${home}/.bashrc && \
  echo "alias vi=\"VIMRUNTIME=${home}/deps/0/apt/usr/share/vim/vim82 ${home}/deps/0/bin/vim.basic\"" >> ${home}/.bashrc && \
  echo "alias vim=\"VIMRUNTIME=${home}/deps/0/apt/usr/share/vim/vim82 ${home}/deps/0/bin/vim.basic\"" >> ${home}/.bashrc && \
  echo "PATH=$PATH:/home/vcap/app/php/bin:/home/vcap/app/vendor/drush/drush" >> /home/vcap/.bashrc

source ${home}/.bashrc

echo "Installing awscli..."
{
  curl -S "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/tmp/awscliv2.zip"
  unzip -qq /tmp/awscliv2.zip -d /tmp/
  /tmp/aws/install --bin-dir ${home}/deps/0/bin --install-dir ${home}/deps/0/usr/local/aws-cli
  rm -rf /tmp/awscliv2.zip /tmp/aws
} >/dev/null 2>&1

if [[ "${CF_INSTANCE_INDEX:-''}" == "0" && -z "${SKIP_DRUPAL_BOOTSTRAP:-}" ]]; then

    echo  "Updating drupal ... "
    drush state:set system.maintenance_mode 1 -y
    drush cr
    drush updatedb --no-cache-clear -y
    drush cim -y
    drush locale-check
    drush locale-update

    echo "Uploading public files to S3 ..."
    drush s3fs-rc
    drush s3fs-cl -y --scheme=public --condition=newer
    
    drush cr
    drush state:set system.maintenance_mode 0 -y

    echo "Bootstrap finished"
else
    echo "Bootstrap skipping Drupal CIM because: Instance=${CF_INSTANCE_INDEX:-''} Skip=${SKIP_DRUPAL_BOOTSTRAP:-''}"
fi

## Only run 'drush cron' in the first instance of an application.
[ "${CF_INSTANCE_INDEX:-''}" == "0" ] && ${HOME}/scripts/cronish &
