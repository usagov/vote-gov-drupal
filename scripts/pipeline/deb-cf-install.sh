#!/bin/bash

echo "Installing CloudFoundry repository..."
{
  curl -L "https://packages.cloudfoundry.org/stable?release=linux64-binary&version=8.8.3&source=github-rel" | tar -zx
  if [ "$(whoami)" != "root" ]; then
    sudo mv cf cf8 /usr/local/bin
  else
    mv cf cf8 /usr/local/bin
  fi
} >/dev/null 2>&1
