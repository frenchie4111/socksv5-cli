#!/bin/bash

# Install sudo
apt-get install -y sudo

# Install Nodev4
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
apt-get install -y nodejs build-essential

# Install socksv5-cli
npm install -g socksv5-cli

