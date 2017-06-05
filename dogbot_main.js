var botBuilder = require('claudia-bot-builder'),
    excuse = require('huh');

module.exports = botBuilder(function (request) {
    return 'Thanks for sending ' + request.text +
        '. Your message is very boring to us, so ' +
        excuse.get();
});