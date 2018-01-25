const mqtt = require('./mqtt');
const config = require('./conf/config');

const mongoose = require('mongoose');
mongoose.connect(config.mongo, function(err) {
	if (err) {
		console.log(err);
	}
});

config.projects.forEach((project) => {
	new mqtt(project);
});
process.on('uncaughtException', (err) => {
	if (err) {
		console.log('stack trace is: ', err.stack);
	}
});
