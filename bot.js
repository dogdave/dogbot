// Top line includes
var botBuilder = require('claudia-bot-builder');
var dogbot = require('./dogbot_main.js');
const promiseDelay = require('promise-delay');

dogbot = new dogbot();
const aws = require('aws-sdk');
const lambda = new aws.Lambda();


module.exports = botBuilder(function (message, originalRequest) {
    return dogbot.respond(message, originalRequest);
});

/*
const api = botBuilder((message, apiRequest) => {

    return new Promise(
        (resolve, reject) => {
            lambda.invoke({
                FunctionName: apiRequest.lambdaContext.functionName,
                Qualifier: apiRequest.lambdaContext.functionVersion,
                InvocationType: 'Event',
                Payload:JSON.stringify({
                    slackEvent: message
                })
            }, (err, done) => {
                    if (err) return reject(err);
                    resolve(done);
            });
        })
        .then(() => {
        return {
            text: 'Returning from .then',
            response_type: 'in_channel'
        }
    })
        .catch((ex) => {
        return 'Dogbot is broken!';
        })
})



module.exports = api;

*/


