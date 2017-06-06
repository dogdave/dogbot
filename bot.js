// Top line includes
var botBuilder = require('claudia-bot-builder');
    //excuse = require('huh');

var dogbot = require('./dogbot_main.js');
dogbot = new dogbot();

module.exports = botBuilder(function (message, originalRequest) {
    return dogbot.respond(message, originalRequest);
});





