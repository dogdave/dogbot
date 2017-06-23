/**
 * Created by Dave on 6/23/2017.
 */
/* Comment Block Goes Here
 */
'use strict';
// Top Line Includes


//var moment = require('moment');
var http_request = require('request');
var Client = require('hubspot');
var client = new Client();
var oneLinerJoke = require('one-liner-joke');
//const aws = require('aws-sdk');
//const lambda = new aws.Lambda();


// Main Function
var DogBot = function () { };
DogBot.prototype.respond = function (message, request) {
    var BotResponse = '';
    var debug = false;

    if (message.text.length === 0) {
        BotResponse = 'Error, null message';
        return BotResponse;
    }
    else {
        BotResponse += 'Dogbot reporting for duty!' + '\r';
    }
    // general debug
    if (message.text.includes("-debug")) {
        debug = true;
        BotResponse += 'Dogbot received: \"' + message.text + '\"\r';
    }
    // verbose debug
    if (message.text.includes("-verbose")) {
        BotResponse += 'Full Message : ' + JSON.stringify(message) + '\r\r';
        BotResponse += 'Full Original Request : ' + JSON.stringify(request) + '\r\r';
    }

    // determine request type

    // determine message type
    switch (message.type) {
        case 'slack-slash-command':
            if (debug) { BotResponse += 'Message Type: Slack Command' + '\r'; }
            BotResponse = SlackResponse(message, request, debug, BotResponse);
            break;
        case 'facebook':
            BotResponse += 'Facebook integration not implemented' + '\r';
            break;
        default:
            BotResponse += 'Message type undefined';
    }

    return BotResponse;
};

function classify_request(message) {
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
    else {// Funny Dog Jokes
        request_type = "default";
    }
    return request_type;
};

function SlackResponse(message, request, debug, currentresponse) {
    var sResponse = currentresponse;
    var SenderID = message.originalRequest.user_name;
    var customerId = 0;
    var requestTime = new Date();
    requestTime.setHours(requestTime.getHours() - 6);
    var request_type = classify_request(message);

    if (debug) {
        sResponse += 'Slack Debug On' + '\r';
        sResponse += 'SenderID: ' + SenderID + '\r';
        sResponse += 'Time: ' + requestTime.toLocaleString('en-US') + '\r';
        sResponse += 'Request Type: ' + request_type + '\r';
    }

    if (request_type == "default")
    {
        // Tell a dog joke!
        sResponse += 'I found this joke for you, I hope you like it!\r';
        var joke = oneLinerJoke.getRandomJokeWithTag('animal');
        // is it appropriate?
        while (
            joke.tags.includes("rude") ||
            joke.tags.includes("dirty") ||
            joke.tags.includes("flirty") ||
            joke.tags.includes("black") ||
            joke.tags.includes("women") ||
            joke.tags.includes("stupid") ||
            joke.tags.includes("sex"))
        {
            console.log ("Bad joke, retrieving a new one.\r");
            joke = oneLinerJoke.getRandomJokeWithTag('animal')
        }
        console.log('Joke = ' + JSON.stringify(joke));
        sResponse += '  ' + joke.body + '\r';
     }
    // Parse Date & Time requests with Moment library


    /// ***** CURRENTLY ASSUME SLACK USERNAME IS FIRST NAME IN HUBSPOT ***** ////


    // Lambda Deployment variable
    // Hubspot API Setup
    client.useKey(process.env.HAPI_Key);
    console.log('API Key set \r');
    console.log(message);
    console.log(currentresponse);

    // Associate with Hubspot User and perform reservation

    return contactsCall('search', SenderID)
        .then(function(res) {
            console.log('processing contacts search \r');
            console.log(JSON.stringify(res));

            // Create a new Contact if none match search
            if (res.total === 0) {
                if (debug) { console.log('New Customer Identified' + '\r') }

                var payload = {
                    "properties": [
                        {
                            "property": "firstname",
                            "value": SenderID
                        }]
                }

                return contactsCall('create', payload)
                    .then(function (res) {
                        customerId = res.vid;

                        return customerId;
                    });
            }
            else {
                customerId = res.contacts[0].vid;

                return customerId;
            }
        })
        .then(function (customerId) {
            if (debug) { console.log('CustomerID: ' + customerId + '\r') }

            // ??
            // Call Google Handler Here with Customer ID & Data

            // ??
            return sResponse += 'CustomerID: ' + customerId + '\r';
        })
        .catch(function(err) {
            console.log('uh oh: ' + err); throw err;
        });
}

function contactsCall(fn, ...args) {
    return new Promise(function (resolve, reject) {
        client.contacts[fn](...args, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


module.exports = DogBot;

