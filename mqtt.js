const mosca = require('./mosca');

function server(project) {
	const settings = {
		port: 1883,
		id: project,
		backend: {
			type: 'mongo',
			url: config.mongo,
			pubsubCollection: 'ascoltatori',
			mongo: {}
		},
		persistence: {
			factory: mosca.persistence.Mongo,
			url: config.mongo
		},
		http: {
			port: 3389,
			bundle: true,
			static: './',
		}
	};

	const server = new mosca.Server(settings, function (err) {
		if (err) {
			console.error('in server initialize failed');
		}
	});
	//client Connected
	server.on('clientConnected', function (client) {
		console.log('client connected', client.id);
	});


	//client disconnecting
	server.on('clientDisconnecting', function (packet, client) {
		console.log('broker clientDisconnecting topic', (packet.topic));
		console.log('broker clientDisconnecting payload', (packet.payload).toString());
	});

	//client disconnected
	server.on('clientDisconnected', function (client) {
		console.log('clientDisconnected', client.id);
	});

	// client subscribed a topic
	server.on('subscribed', function (packet, client) {
		console.log('broker subscribed topic', (packet.topic));
		if (packet.payload) {
			console.log('broker subscribed payload', (packet.payload).toString());
		}
	});

	// client unsubscribed a topic
	server.on('unsubscribed', function (packet, client) {
		console.log('broker unsubscribed topic', (packet.topic));
		if (packet.payload) {
			console.log('broker unsubscribed payload', (packet.payload).toString());
		}
	});

	// fired when a message is received
	server.on('published', function (packet, client) {
		console.log('broker published topic', (packet.topic));
		if (packet.payload) {
			console.log('broker unsubscribed payload', (packet.payload).toString());
		}
	});

	server.on('ready', function (err) {
		if (err) {
			return console.error('Mosca server setup failed');
		}
		console.log(`Mosca server for ${server.id} is up and running`);
	});

	server.on('error', function (err) {
		console.log(err);
	});
	return server;

}
module.exports = server;
