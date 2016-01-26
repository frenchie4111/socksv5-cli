#!/usr/bin/env node

var fs = require( 'fs' ),
	_ = require( 'underscore' );

var args = process.argv.slice( 2 );

var help = {
	'ips': 'Returns a list of all ips',
	'setuser': 'Sets username/password for specified ip - Ussage: socksv5-config setuser [IP] [New Username] [New Password]'
};

var printUssage = function( command ) {
	console.error( 'Ussage:' )
	console.error( ' -> Run command: socksv5-config [command] [...args]' )
	console.error( ' -> Command help: socksv5-config help [command]' )
	console.error( 'Commands: help ips setuser' );
	if( command && help.hasOwnProperty( command ) ) {
		console.error( '' ); 
		console.error( 'Help for: ' + command ); 
		console.error( ' -> ' + help[ command ] ); 
	}
};

var printChangeComplete = function() {
	console.log( 'Change complete' );
	console.log( ' -> Use `/etc/init.d/socksv5 restart` to apply changes' );
};

var exitAndPrint = function( error ) {
	console.error( error );
	printUssage();
	process.exit( 2 );
};

if( args.length < 1 ) {
	exitAndPrint( 'No arugments specified' );
};

var loadConfig = function( path ) {
	path = path || '/etc/socksv5.conf';

	var config;
	try {
		config = fs.readFileSync( path );
	} catch( e ) {
		console.error( e );
		exitAndPrint( 'Failed to open: ' + path );
	}
	try {
		config = JSON.parse( config );
	} catch( e ) {
		exitAndPrint( 'Failed to parse: ' + path );
	}
	return config;
}

var saveConfig = function( path, config ) {
	path = path || '/etc/socksv5.conf';

	var config_json = JSON.stringify( config, null, 4 );
	fs.writeFileSync( path, config_json );

	printChangeComplete();
}

var getIps = function() {
	var config = loadConfig();	
	_
		.each( config, function( single_config ) {
			if( single_config.username && single_config.password ) {
				console.log( single_config.username + ':' + single_config.password + '@' + single_config.host + ':' + single_config.port );
			} else {
				console.log( single_config.host + ':' + single_config.port );
			}
		} );
}

var setUser = function( ip, username, password ) {
	if( arguments.length !== 3 || !ip || !username || !password ) exitAndPrint( 'Invalid arugments' );
	var config = loadConfig();

	var ip_found = _
		.find( config, function( item ) {
			return ( item.host === ip );
		} );

	if( !ip_found ) exitAndPrint( 'Specified ip not found: ' + ip );

	ip_found.username = username;
	ip_found.password = password;

	saveConfig( null, config );
}

var commands = {
	'help': printUssage,
	'ips': getIps,
	'setuser': setUser
}

if( commands.hasOwnProperty( args[ 0 ] ) ) {
	commands[ args[ 0 ] ].apply( null, args.slice( 1 ) );
} else {
	exitAndPrint( 'Invalid Argument' );
}
