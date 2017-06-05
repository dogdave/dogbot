// Top line includes
var botBuilder = require('claudia-bot-builder');
    //excuse = require('huh');

var dogbot = require('./dogbot_main.js');

module.exports = botBuilder(function (message, originalRequest) {
    return dogbot.respond(message, originalRequest);
});




/*
module.exports = botBuilder(function (message) {
    console.log('Msg Received : ', message.text);
    console.log('Full Message : ', JSON.stringify(message.originalRequest));
    return 'Thanks for sending ' + message.text +
        '. Your message is very boring to us, so ' +
        excuse.get();
});*/

