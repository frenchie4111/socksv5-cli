# Socksv5 Cli

Hosts socksv5 proxy when given a simple config

Installation:

```
npm install -g socksv5-cli
```

Ussage:

```
socksv5 /full/path/to/config.json
```

Config file generation:

A basic config file generator is provided, it will try to create
an unauthenticated proxy for every external network interface.

```
socksv5-gen > proxy_config.json
```

Config file format (See config.sample.json):

```
[
	{
		"host": <external ip>,
		"port": <port>,
		"username": <username>,
		"password": <password>
	}
]
```

Example config:

```
[
	{
		"host": "123.456.789.123",
		"port": 123,
		"username": "proxy1user",
		"password": "proxy1pass"
	},
	{
		"host": "51.23.4.123",
		"port": 124,
		"username": "proxy2user",
		"password": "proxy2user"
	}
]
```
