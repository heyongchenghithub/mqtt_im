var mqtt = require('mqtt');
var num = 0;

const host = 'localhost'
const port = '1883';

var settings = {
    keepalive: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: '5a5ea50c553513774072889a',
    username: '5a5ea50c553513774072889a',
    password: 'secret'
}
  
  // client connection
  
  var client = mqtt.connect('mqtt://localhost:1883', settings, function (err, data) {
    console.log(err, data)
});
  
setInterval(function (){//发布主题为‘test’的消息
    num ++;
    var qtt={};//定义消息（可以为字符串、对象等）
    qtt.num = num;
    client.publish('test',JSON.stringify(qtt),{qos:1, retain: true} ,function (err) {
        if (err) {
            console.log(err)
        }
    });
}, 10000);