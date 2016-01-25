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


# Find node install directory
FILE_SYM=`which socksv5`
FILE=`readlink -f ${FILE_SYM}`
DIR=`dirname ${FILE}`

# Setup initd script
$DIR/node_modules/.bin/initd-forever --app "$DIR/index.js /etc/socksv5.conf" -n socksv5 -f $DIR/node_modules/.bin/forever
chmod +x socksv5 

# Copy initd script
cp socksv5 /etc/init.d/

# Start initd script
systemctl daemon-reload
/etc/init.d/socksv5 start

# Finished log
echo "----"
echo "Socksv5 should be installed as a system daemon now"
echo " -> Logfile: /var/run/socksv5.log"
echo " -> Ussage"
echo " --> Start: /etc/init.d/socksv5 start"
echo " --> Restart: /etc/init.d/socksv5 restart"
echo " --> Stop: /etc/init.d/socksv5 stop"

