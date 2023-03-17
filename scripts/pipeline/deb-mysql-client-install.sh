#!/bin/bash

## To work for rootless and root images.
[ "$(whoami)" != "root" ] && sudo="sudo"

wget https://dev.mysql.com/get/mysql-apt-config_0.8.18-1_all.deb
${sudo} dpkg -i mysql-apt-config_0.8.18-1_all.deb
${sudo} apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
${sudo} apt update
${sudo} apt install -y mysql-client