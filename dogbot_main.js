/* Comment Block Goes Here

 */
'use strict';
// Top Line Includes

//var API_Keys = require('./API_Access.js');

var moment = require('moment');
var http_request = require('request');
var Client = require('hubspot');
var client = new Client();
const aws = require('aws-sdk');
const lambda = new aws.Lambda();


// Main Function
var DogBot = function (){};
DogBot.prototype.respond = function (message, request) {
    var BotResponse = '';
    var debug = false;

    if (message.text.length === 0) {
        BotResponse = 'Error, null message';
        return BotResponse;
    }
    else
    {
        BotResponse += 'Dogbot reporting for duty!' + '\r';
    }
    // general debug
    if (message.text.includes("-debug")){
    debug = true;
    BotResponse += 'Dogbot received: \"' + message.text +  '\"\r';
    }
    // verbose debug
    if (message.text.includes("-verbose")){
        BotResponse += 'Full Message : ' + JSON.stringify(message) + '\r\r';
        BotResponse += 'Full Original Request : ' + JSON.stringify(request) + '\r\r';
    }

    // determine request type

    // determine message type
    switch(message.type) {
        case 'slack-slash-command':
            if (debug){BotResponse += 'Message Type: Slack Command' + '\r';}
            return SlackResponse(message, request, debug, BotResponse);
            break;
        case 'facebook':
            BotResponse += 'Facebook integration not implemented' + '\r';
            break;
        default:
            BotResponse += 'Message type undefined';
    }
    return BotResponse;
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
    // Funny Dog Jokes

    return request_type;
};

function SlackResponse(message, request, debug, currentresponse){
    var SlackResponse = currentresponse;
    var SenderID = message.originalRequest.user_name;
    //var SenderName = request.indexOf("username") // fix
    var CustomerID = 0;
    //    var RequestTime =  new Date();

    if (debug){
        SlackResponse += 'Slack Debug On' + '\r';
        SlackResponse += 'SenderID: ' + SenderID + '\r';
  //      SlackResponse += 'Time: ' + RequestTime.toLocaleString() + '\r';
    }
// Parse Date & Time requests with Moment library

/// ***** CURRENTLY ASSUME SLACK USERNAME IS FIRST NAME IN HUBSPOT ***** ////

// Associate with Hubspot User and perform reservation

// Lambda Deployment variable
// Hubspot API Setup
 //   client.useKey(API_Keys.HAPI_Key);
    client.useKey(process.env.HAPI_Key);
    console.log('API Key set \r');
    console.log(message);
    console.log(currentresponse);

    client.contacts.search(SenderID,
        function processSearchResult(err, res) {
            console.log('In processSearchResult function \r');
            console.log(JSON.stringify(res));
            if (err) { console.log('uh oh'); throw err; }
            if (res.total === 0)
            {
                if(debug){console.log('New Customer Identified' + '\r')}

                // if(debug){SlackResponse += 'New Customer Identified' + '\r'}
                // Create a new Contact
                var payload = {
                    "properties": [
                        {
                            "property": "firstname",
                            "value": SenderID
                        }]
                }
                client.contacts.create(payload, function(err, res){
                    if (err) { throw err; }
                    CustomerID = res.vid;
                    if(debug){console.log('New Customer Created with CustomerID: ' + CustomerID + '\r')}
                    // if(debug){SlackResponse += 'New Customer Created with CustomerID: ' + CustomerID + '\r'}
                        // Call Google Handler Here with Customer ID & Data
                    //return SlackResponse;
                    })
            }
            else
            {
                CustomerID = res.contacts[0].vid;
                if(debug){console.log('Hubspot CustomerID:' + CustomerID + '\r')}
                //   if(debug){SlackResponse += 'Hubspot CustomerID:' + CustomerID + '\r'}
            }

            // Call Google Handler with Customer ID & Data
          //  return SlackResponse;
        }
    );

    console.log('About to return \r');
    return SlackResponse;
}


module.exports = DogBot;


//scratchpad
/*
var test = "hello -debug";

if (test.includes("-debugs")){
    console.log('pass');
}*/

