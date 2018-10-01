#!/bin/bash

# Performs any provisioning needed for a clean build.
#
# This script is meant to be used either directly
# as a `before_install` step such that the next step
# in the Travis build have the environment properly 
# setup.
#
# The script is also handy for debugging - SSH into
# the machine and then call `./.travis/main.sh` to
# have all dependencies set.

set -o errexit

main() {
  setup_dependencies

  echo "INFO:
  Done! Finished setting up Travis-CI machine.
  "
}

# Takes care of updating any dependencies that the
# machine needs.
setup_dependencies() {
  echo "INFO:
  Setting up dependencies.
  "
  sudo service mysql stop

  sudo apt update -y
  sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt update -y
  sudo apt install --only-upgrade docker-ce -y

  sudo rm /usr/local/bin/docker-compose
  curl -L https://github.com/docker/compose/releases/download/1.9.0/docker-compose-`uname -s`-`uname -m` > docker-compose
  chmod +x docker-compose
  sudo mv docker-compose /usr/local/bin

  curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
  sudo apt-get install nodejs

  sudo apt-get install mailutils

  docker-compose --version
  docker info
  node --version
}

main
