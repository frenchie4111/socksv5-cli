#!/usr/bin/env node

var _ = require( 'underscore' );

var startServer = require( './lib/server' ).startServer;

var args = process.argv.slice( 2 );

if( args.length !== 1 ) {
	console.error( 'Ussage: socksv5 <path/to/config.json>' );
	process.exit( 2 );
}

console.log( "Loading Config from: " + args[ 0 ] );
var config = require( args[ 0 ] );

if( _.isArray( config ) ) {
	_
		.each( config, function( server_config ) {
			startServer( server_config );
		} );
} else {
	startServer( server_config );
}

