#!/bin/bash

## To work for rootless and root images.
[ "$(whoami)" != "root" ] && sudo="sudo"

echo "Installing CloudFoundry repository..."
{
  wget -q -O - https://packages.cloudfoundry.org/debian/cli.cloudfoundry.org.key | ${sudo} apt-key add -
  echo "deb https://packages.cloudfoundry.org/debian stable main" | ${sudo}  tee /etc/apt/sources.list.d/cloudfoundry-cli.list
  ${sudo} apt update
  ${sudo} apt install -y cf8-cli
}  2>&1 >/dev/null