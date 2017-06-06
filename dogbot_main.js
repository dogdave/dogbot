/* Comment Block Goes Here

 */
// Top Line Includes
var moment = require('moment');

// Main Function
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
    response += 'Dogbot received: \"' + message.text +  '\"\r';
    }
    // verbose debug
    if (message.text.includes("-verbose")){
        response += 'Full Original Message : ' + JSON.stringify(request) + '\r\r';
    }
    // determine message type
    switch(message.type) {
        case 'slack-slash-command':
            if (debug){response += 'Message Type: Slack Command' + '\r';}
            response += SlackResponse(message, request, debug);

            break;
        case 'facebook':
            break;
        default:
            response += 'Message type undefined';
    }

    return response;
};

function SlackResponse(message, request, debug){
    var SlackResponse = '';

    if (debug){
        SlackResponse += 'Slack Debug On' + '\r';
        SlackResponse += 'User: ' + message.sender + '\r';
        SlackResponse += 'Time: ' + new Date().toLocaleString(); + '\r\r\n';
    }

    var parse_index =0;
    parse_index = message.text.indexOf("reservation");

    if (debug){
        SlackResponse += 'Reservation Index: ' + parse_index + '\r';
    }

    if (parse_index !== -1)
    {
        // Customer wants to make a reservation
        if(debug) {
            SlackResponse += 'Reservation String: ' + message.text.substring(parse_index) + '\r';
            SlackResponse += 'Moment Parse: ' + moment(message.text.substring(parse_index)).toLocaleString() + '\r';
        }
        var StartDate = new Date();
        var EndDate = new Date();
    }


    return SlackResponse;
}


module.exports = DogBot;


//scratchpad
/*
var test = "hello -debug";

if (test.includes("-debugs")){
    console.log('pass');
}*/

