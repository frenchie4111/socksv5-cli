#!/usr/bin/env node

var os = require( 'os' ),
	_ = require( 'underscore' );

var network_interfaces = os.networkInterfaces();

var port_i = 1;

var config = _
	.chain( network_interfaces )
	.filter( function( interface, name ) {
		return( interface.length === 1 && 
				!interface[ 0 ].internal && 
				interface[ 0 ].family === 'IPv4' &&
				interface[ 0 ].address !== '127.0.0.1' );
	} )
	.map( function( interface, name ) {
		return {
			host: interface[ 0 ].address,
			port: 1080
		}
	} )
	.value();

console.log( JSON.stringify( config, null, 4 ) );

