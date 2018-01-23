const mosca = require('./mosca');
const config = require('./conf/config');
//const ascoltatori = require('ascoltatori');

const settings = {
	port: 1883,
	backend: {
		type: 'mongo',
		url: config.mongo,
		pubsubCollection: 'ascoltatori',
		mongo: {}
	},
	persistence: {
		factory: mosca.persistence.Mongo,
		url: config.mongo
	}
};

const server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
	console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
	console.log('broker published topic', (packet.topic));
	console.log('broker published payload', (packet.payload).toString());
});
server.on('clientDisconnecting', function (packet, client) {
	console.log('broker clientDisconnecting topic', (packet.topic));
	console.log('broker clientDisconnecting payload', (packet.payload).toString());
});
server.on('clientDisconnected', function (client) {
	console.log('clientDisconnected', client.id);
});
server.on('ready', setup);
// fired when the mqtt server is ready
function setup() {
	console.log('Mosca server is up and running');
}
server.authenticate = function (client, username, password, callback) {
	// var authorized = (username === '5a5ea50c553513774072889a' && password.toString() === 'secret');
	// if (authorized) client.user = username;
	callback(null, true);
};
