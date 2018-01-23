const mqtt = require('mqtt');
let num = 0;

const settings = {
	keepalive: 1000,
	protocolId: 'MQIsdp',
	protocolVersion: 3,
	clientId: 'heyongcheng',
	username: 'heyongcheng',
	password: 'secret'
};
// client connection

var client = mqtt.connect('mqtt://im.dev.poker.top', settings, function (err, data) {
	console.log(err, data);
});

setInterval(function () {//发布主题为‘test’的消息
	num++;
	var qtt = {};//定义消息（可以为字符串、对象等）
	qtt.num = 'hyc' + num;
	client.publish('hyctest', JSON.stringify(qtt), { qos: 1, retain: true }, function (err) {
		if (err) {
			console.log(err)
		}
	});
}, 10000);