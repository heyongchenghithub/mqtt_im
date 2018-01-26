const mqtt = require('./mqtt');
const config = require('./conf/config');
const auth = require('./auth');

const mongoose = require('mongoose');
mongoose.connect(config.mongo, function(err) {
	if (err) {
		console.log(err);
	}
});

config.projects.forEach((project) => {
	const server = new mqtt(project);
	server.on('ready', function (err) {
		if (err) {
			return console.error('Mosca server setup failed');
		}
		console.log(`Mosca server for ${server.id} is up and running`);
		server.authenticate = auth.authenticate;
		server.authorizePublish = auth.authorizePublish;
  		server.authorizeSubscribe = auth.authorizeSubscribe;
	});
});
process.on('uncaughtException', (err) => {
	if (err) {
		console.log('stack trace is: ', err.stack);
	}
});
