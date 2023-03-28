#!/bin/bash

## To work for rootless and root images.
[ "$(whoami)" != "root" ] && sudo su

{
  wget https://dev.mysql.com/get/mysql-apt-config_0.8.18-1_all.deb
  dpkg -i mysql-apt-config_0.8.18-1_all.deb
  apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
  apt-get update
  apt-get install -y mysql-client
} >/dev/null 2>&1