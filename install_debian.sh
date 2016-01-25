#!/bin/bash

# Check if root
if [[ $EUID -ne 0 ]]; then
   echo "Please run this script as root" 
   exit 1
fi

# Install Nodev4
curl -sL https://deb.nodesource.com/setup_4.x | bash -
apt-get update
apt-get install -y nodejs build-essential

# Install socksv5-cli
npm install -g socksv5-cli
