/**
 * Created by Dave on 6/7/2017.
 */

// Testing APIs
var http_request = require('request');
var API_Keys = require('./API_Access.js');

console.log(Hubspot_Query('slack_user_id', 'test'));

//Hubspot_Create('testerJoe');

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
        case 'SlackID':
            Hubspot_VID = Hubspot_Query('slack_user_id', username);
            break;
        default:
            Hubspot_VID = 0;
            result_count = 0;
            break;
    }
    return Hubspot_VID;
}

/*
function Hubspot_Query (field, query){
    var count = 0;
    http_request('https://api.hubapi.com/contacts/v1/search/query?q=' + query +
        '&hapikey=' + API_Keys.Hubspot,
        function (error, response, body){
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            var json = JSON.parse(body);
            console.log(json.contacts[0].vid);
            vid = json.contacts[0].vid;

        })
    return (vid);
}
console.log(Hubspot_Query('slack_user_id', 'test'));
*/

function Hubspot_Query (field, query){
    var count = 0;
    var vid = 0;
    var temp;
    http_request('https://api.hubapi.com/contacts/v1/search/query?q=' + query +
        '&hapikey=' + API_Keys.Hubspot,
        function (error, response, body){
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
            var json = JSON.parse(body);
            console.log(json.contacts[0].vid);
            //        return (json.contacts[0].vid);
        })
    console.log(vid);
    return vid;
}

function Hubspot_Create (username) {
 //   console.log(username);
    var payload = {
        "properties": [
     /*       {
                "property": "email",
                "value": "testingapis@hubspot.com"
            },
          */  {
                "property": "firstname",
                "value": username
            },
     /*       {
                "property": "lastname",
                "value": "Mott"
            },
            {
                "property": "website",
                "value": "http://hubspot.com"
            },
            {
                "property": "company",
                "value": "HubSpot"
            },
            {
                "property": "phone",
                "value": "555-122-2323"
            },
            {
                "property": "address",
                "value": "25 First Street"
            },
            {
                "property": "city",
                "value": "Cambridge"
            },
            {
                "property": "state",
                "value": "MA"
            },
            {
                "property": "zip",
                "value": "02139"
            }
      */  ]
    };
 //   console.log(JSON.stringify(payload));
    http_request(
        {
            method: 'POST',
            uri: 'https://api.hubapi.com/contacts/v1/contact/?' +
            '&hapikey=' + API_Keys.Hubspot,
            body: JSON.stringify(payload),
        }
        , function (error, response, body) {
            // console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
            return response && response.statusCode;
        })
    // console.log(response && response.statusCode);
}

