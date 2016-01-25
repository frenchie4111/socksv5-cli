#!/usr/bin/env node

var _ = require( 'underscore' ),
	fs = require( 'fs' );

var startServer = require( './lib/server' ).startServer;

var args = process.argv.slice( 2 );

var exitAndPrint = function( error ) {
	console.error( error );
	process.exit( 2 );
}

if( args.length !== 1 ) {
	exitAndPrint( 'Ussage: socksv5 <path/to/config.json>' );
}

console.log( "Loading Config from: " + args[ 0 ] );

var config; 

try {
	config = fs.readFileSync( args[ 0 ] );
} catch( e ) {
	console.error( e );
	exitAndPrint( 'Failed to open: ' + args[ 0 ] );
}

try {
	config = JSON.parse( config );
} catch( e ) {
	exitAndPrint( 'Failed to parse: ' + args[ 0 ] );
}

if( _.isArray( config ) ) {
	_
		.each( config, function( server_config ) {
			startServer( server_config );
		} );
} else {
	startServer( server_config );
}

