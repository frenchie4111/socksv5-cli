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
