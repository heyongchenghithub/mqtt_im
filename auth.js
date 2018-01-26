"use strict";

//账密认证
const authenticate = function (client, username, password, callback) {
    var authorized = (username === 'alice' && password.toString() === 'secret');
    if (authorized) client.user = username;
    callback(null, authorized);
}

//发布检测
const authorizePublish = function (client, topic, payload, callback) {
    callback(null, client.user == topic.split('/')[1]);
}

//订阅检测
const authorizeSubscribe = function (client, topic, callback) {
    callback(null, client.user == topic.split('/')[1]);
}


module.exports = {
    authenticate,
    authorizePublish,
    authorizeSubscribe,
}