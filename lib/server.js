var socks = require( 'socksv5-frenchie4111' );

var startServer = function( server_config ) {
	var server = socks.createServer( function( info, accept, deny ) {
		accept();
	} );

	server.listen( server_config.port, server_config.host, function() {
		console.log( ' -> Server Listening on: ' + server_config.host + ':' + server_config.port );
	} );

	if( server_config.username && server_config.password ) {
		server.useAuth( socks.auth.UserPassword( function( username, password, callback ) {
			callback( username === server_config.username && password === server_config.password );
		} ) );
	} else {
		server.useAuth( socks.auth.None() );
	}
}
exports.startServer = startServer;
