#!/bin/bash

# Check if root
if [[ $EUID -ne 0 ]]; then
   echo "Please run this script as root" 
   exit 1
fi

echo "Installing Socksv5 as a daemon"

# Install Nodev4
echo " -> Installing NodeJS"
echo " --> Adding nodejs to packages"
curl -sL https://deb.nodesource.com/setup_4.x | bash - > /dev/null
echo " --> Updating apt"
apt-get -qq update
echo " --> Installing nodejs via apt-get"
apt-get -qq install -y nodejs build-essential

# Install socksv5-cli
echo " -> Installing socksv5-cli via npm"
npm install --silent -g socksv5-cli > /dev/null


# Find node install directory
echo " -> Locating install locaiton"
FILE_SYM=`which socksv5`
FILE=`readlink -f ${FILE_SYM}`
DIR=`dirname ${FILE}`
echo " --> Installed at ${DIR}"

# Setup initd script
echo " -> Creating init.d script"
$DIR/node_modules/.bin/initd-forever --app $DIR/index.js -n socksv5 -f $DIR/node_modules/.bin/forever > /dev/null
chmod +x socksv5 

# Copy initd script
mv socksv5 /etc/init.d/

# Create base conf file
echo " -> Creating base socksv5 config"
socksv5-gen > /etc/socksv5.conf

# Start initd script
echo " -> Starting socksv5 daemon"
systemctl daemon-reload > /dev/null
/etc/init.d/socksv5 start > /dev/null

# Setup onboot
echo " -> Setting up on-boot load of socksv5"
update-rc.d socksv5 defaults > /dev/null 2> /dev/null

# Finished log
echo "----"
echo "Socksv5 should be installed as a system daemon now"
echo " -> Logfile: /var/run/socksv5.log"
echo " -> Config file: /etc/socksv5.conf"
echo " -> Ussage"
echo " --> Start: /etc/init.d/socksv5 start"
echo " --> Restart: /etc/init.d/socksv5 restart"
echo " --> Stop: /etc/init.d/socksv5 stop"

