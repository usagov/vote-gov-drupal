#!/bin/bash

## To work for rootless and root images.
echo "Installing AWS CLI..."
{
  if [ "$(whoami)" != "root" ]; then
    sudo apt-get update
    sudo apt-get install -y python3 python3-pip
    sudo pip3 install --upgrade pip
    sudo pip3 install awscliv2
  else
    apt-get update
    apt-get install -y python3 python3-pip
    pip3 install --upgrade pip
    pip3 install awscliv2
  fi
} >/dev/null 2>&1