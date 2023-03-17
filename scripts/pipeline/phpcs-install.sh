#!/bin/bash

## To work for rootless and root images.
[ "$(whoami)" != "root" ] && $sudo="sudo"

echo "Installing PHP CodeSniffer..."
{
  git clone --branch 8.3.x http://git.drupal.org/project/coder.git
  cd coder
  composer install
  cd ..
  export PATH="$PATH:$HOME/project/coder/vendor/bin"
} 2>&1 >/dev/null