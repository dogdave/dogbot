/* Comment Block Goes Here

 */
// Top Line Includes
var moment = require('moment');
var API_Keys = require('./API_Access.js');

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

    // determine request type
    var request_type = classify_request(message);

    // determine message type
    switch(message.type) {
        case 'slack-slash-command':
            if (debug){response += 'Message Type: Slack Command' + '\r';}
            response += SlackResponse(message, request, debug, request_type);

            break;
        case 'facebook':
            break;
        default:
            response += 'Message type undefined';
    }

    return response;
};

function classify_request(message){
    // What does the user want?
    var request_type = '';

    // Reservation Related
    if (message.text.includes('reservation')) {
        // Status of Reservation
        if (message.text.includes('status')) {
            request_type = "reservation_status";
        }
        // New Reservation Request
        else if (message.text.includes('new')) {
            request_type = "reservation_new";
        }
        else {
            request_type = "reservation_unknown";
        }
    }
    // Funny Dog Pictures

    return request_type;
};

function SlackResponse(message, request, debug, request_type){
    var SlackResponse = '';
    var User = message.sender;
    var RequestTime =  new Date();

    if (debug){
        SlackResponse += 'Slack Debug On' + '\r';
        SlackResponse += 'User: ' + User + '\r';
        SlackResponse += 'Time: ' + RequestTime.toLocaleString() + '\r';
    }

/* Old Code - Ignore
    var parse_index =0;


    // New Reservation Request?
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
            SlackResponse += 'Request Type: ' + request_type + '\r';
        }
        var StartDate = new Date();
        var EndDate = new Date();
    }
*/

// BEGIN PSUEDOCODE
    // Switch on Message Type

        // Reservation Status Request
            // Match User ID and next upcoming calendar object in Google Calendar
            // Create confirmation message

        // New Reservation Request
            // Get Start Date + Time
            // Get End Date + Time
            // Create reservation in Google Calendar
            // Create confirmation message with details

    return SlackResponse;
};


module.exports = DogBot;


//scratchpad
/*
var test = "hello -debug";

if (test.includes("-debugs")){
    console.log('pass');
}*/

