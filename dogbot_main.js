/* Comment Block Goes Here

 */
var DogBot = function (){};
DogBot.prototype.respond = function (message, request) {
    var response = '';
    var debug = false;

    if (message.text.length === 0) {
        response = 'Error, null message';
    }
    else
    {
        response += 'Dogbot reporting for duty!' + '\r';
    }
    // general debug
    if (message.text.includes("-debug")){
    debug = true;
    response += 'Received ' + message.text + '\r';
    }
    // verbose debug
    if (message.text.includes("-verbose")){
        response += 'Full Original Message : ' + JSON.stringify(request) + '\r\r';
    }
    // determine message type
    switch(message.type) {
        case 'slack-slash-command':
            if (debug){
                response += 'Message Type: Slack Command' + '\r';
            }
            break;
        case 'facebook':
            break;
        default:
            response += 'Message type undefined';
    }

    return response;
};



module.exports = DogBot;
/*
module.exports = botBuilder(function (message) {
    return 'Thanks for sending ' + message.text +
        '. Your message is very boring to us, so ' +
        excuse.get() + '\r\r' +
        "Full message Text : " + JSON.stringify(message.originalRequest);
});*/

//scratchpad
/*
var test = "hello -debug";

if (test.includes("-debugs")){
    console.log('pass');
}*/

