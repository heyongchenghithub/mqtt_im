var mqtt = require('mqtt');
var num = 0;

const host = 'localhost'
const port = '1883';

var settings = {
    keepalive: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: '5a5ea50c553513774072889b',
    username: '5a5ea50c553513774072889a',
    password: 'secret',
    clean: false,
    will: {
        topic: 'bye',
        qos: 1,
        retain: true
    }
}

// client connection

var client = mqtt.connect('mqtt://localhost:1883', settings, function (err, data) {
    console.log(err, data)
});
client.subscribe('test', { qos: 1 });

client.on('message', function (topic, message) {
    console.log('Sub message',message.toString());
});