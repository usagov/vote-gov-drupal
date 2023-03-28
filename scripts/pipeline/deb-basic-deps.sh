#!/bin/bash

## To work for rootless and root images.
[ "$(whoami)" != "root" ] && sudo su

echo "Installing basic dependencies..."
{
  apt-get update
  apt-get install -y wget gnupg gettext
} >/dev/null 2>&1