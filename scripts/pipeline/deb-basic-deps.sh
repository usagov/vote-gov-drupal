#!/bin/bash

## To work for rootless and root images.
[ "$(whoami)" != "root" ] && sudo="sudo"

{
  ${sudo} apt update
  ${sudo} apt install -y wget gnupg gettext
} 2>&1 >/dev/null