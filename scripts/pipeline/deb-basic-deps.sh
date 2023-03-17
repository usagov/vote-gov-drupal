#!/bin/bash

## To work for rootless and root images.
[ "$(whoami)" != "root" ] && sudo="sudo"

echo "Installing basic dependencies..."
{
  ${sudo} apt-get update
  ${sudo} apt-get install -y wget gnupg gettext
} >/dev/null 2>&1