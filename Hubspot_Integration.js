/**
 * Created by Dave on 6/7/2017.
 */

// Testing APIs
var http_request = require('request');
var API_Keys = require('./API_Access.js');

// Sanity Check
/*
http_request('https://api.hubapi.com/contacts/v1/search/query?q=testingapis&hapikey=' + API_Keys.Hubspot, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});*/

/*
 http_request('https://api.hubapi.com/contacts/v1/search/query?q=testingapis&hapikey=' + API_Keys.Hubspot, function (error, response, body) {
 console.log('error:', error); // Print the error if one occurred
 console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
 console.log('body:', body); // Print the HTML for the Google homepage.
 });*/

exports.Search = function (type, username){
    var Hubspot_VID =0;
    var result_count =0;

    switch(type){
        case: 'SlackID'
            Hubspot_VID = Hubspot_Query('slack_user_id', username);
            break;
        default:
            Hubspot_VID = 0;
            result_count = 0;
            break;
    }


    return Hubspot_VID;
}

function Hubspot_Query (field, query){
    var count
}