var dogbot = function (message, request) {};

dogbot.prototype.respond = function (message, request) {
    var response = 'Error, null response';

    //debug
    if (message.length >0){
        response = 'Received : ' + message.text + '\r' +
                'Full Original Message : ' + JSON.stringify(request);
    }
};

module.exports = new dogbot(message, request);
/*
module.exports = botBuilder(function (message) {
    return 'Thanks for sending ' + message.text +
        '. Your message is very boring to us, so ' +
        excuse.get() + '\r\r' +
        "Full message Text : " + JSON.stringify(message.originalRequest);
});*/