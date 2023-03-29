#!/bin/bash

{
    wget https://dev.mysql.com/get/mysql-apt-config_0.8.18-1_all.deb
    ## To work for rootless and root images.
    if [ "$(whoami)" != "root" ]; then
      sudo dpkg -i mysql-apt-config_0.8.18-1_all.deb
      sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
      sudo apt-get update
      sudo apt-get install -y mysql-client
    else
      dpkg -i mysql-apt-config_0.8.18-1_all.deb
      apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
      apt-get update
      apt-get install -y mysql-client
    fi
} >/dev/null 2>&1