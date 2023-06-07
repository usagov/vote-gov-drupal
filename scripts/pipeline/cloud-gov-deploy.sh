#!/bin/bash

wait_for_task(){
  task_id=$1
  count=0
  while : ; do
    tasks=$(cf tasks ${project}-drupal-${CIRCLE_BRANCH})
    task=$(echo $tasks | grep "${task_id}")
    status=$(echo $task | awk '{print $3}'| tr '[:upper:]' '[:lower:]')
    if [ "${status}" = "succeeded" ]; then
      break
    elif [ "${status}" = "failed" ]; then
      echo "Task failed!"
      kill -SIGPIPE "$$"
    elif [ "${count}" -gt "60" ]; then
      echo "Task timed out!"
      kill -SIGPIPE "$$"
    else
      sleep 5
      count=$((${count}+1))
    fi
  done
}

mv manifest.yml manifest.tmp
envsubst < manifest.tmp > manifest.yml

space=${CIRCLE_BRANCH}
[ "${CIRCLE_BRANCH}" = "test" ] && space="dev"

cf push

cf add-network-policy ${project}-drupal-${CIRCLE_BRANCH} ${proxy_name} -s ${proxy_space} --protocol tcp --port ${proxy_port}
cf add-network-policy ${waf_name} ${project}-drupal-${CIRCLE_BRANCH} -s "${project}-${space}" --protocol tcp --port ${drupal_port}
export task_id=$(cf run-task ${project}-drupal-${CIRCLE_BRANCH} --command "./scripts/post-deploy" --name "${project}-${CIRCLE_BRANCH}-post-deploy"  -k "2G" -m "256M" | grep 'task id:' | awk '{print $NF}')
wait_for_task ${task_id}
cf run-task ${project}-drupal-${CIRCLE_BRANCH} --command "./scripts/build_static" --name "${project}-${CIRCLE_BRANCH}-tome"  -k "2G" -m "256M"