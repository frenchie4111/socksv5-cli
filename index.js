#!/usr/bin/env node

var _ = require( 'underscore' ),
	fs = require( 'fs' );

var startServer = require( './lib/server' ).startServer;

var args = process.argv.slice( 2 );

var exitAndPrint = function( error ) {
	console.error( error );
	process.exit( 2 );
}

var path = '/etc/socksv5.conf';

if( args.length !== 1 ) {
	path = args[ 0 ];
}

console.log( "Loading Config from: " + path );

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

if( _.isArray( config ) ) {
	_
		.each( config, function( server_config ) {
			startServer( server_config );
		} );
} else {
	startServer( server_config );
}

