// Top line includes
var botBuilder = require('claudia-bot-builder');
var dogbot = require('./dogbot_main.js');
const promiseDelay = require('promise-delay');


//var message = {"sender":"U59A0KXMX","text":"-debug -verbose","originalRequest":{"token":"nUp8JM8iOad9yNvItMehrHfV","team_id":"T5A02F3EZ","team_domain":"dogdorks","channel_id":"C5ANC8RGF","channel_name":"app-testing","user_id":"U59A0KXMX","user_name":"dave","command":"/dogbot","text":"-debug -verbose","response_url":"https://hooks.slack.com/commands/T5A02F3EZ/195292007632/0uJcZy58Qz7jDFs6kGQD2yle"},"type":"slack-slash-command"};
//var originalRequest = {"v":3,"rawBody":"token=nUp8JM8iOad9yNvItMehrHfV&team_id=T5A02F3EZ&team_domain=dogdorks&channel_id=C5ANC8RGF&channel_name=app-testing&user_id=U59A0KXMX&user_name=dave&command=%2Fdogbot&text=-debug+-verbose&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT5A02F3EZ%2F195292007632%2F0uJcZy58Qz7jDFs6kGQD2yle","normalizedHeaders":{"accept":"application/json,*/*","accept-encoding":"gzip,deflate","cloudfront-forwarded-proto":"https","cloudfront-is-desktop-viewer":"true","cloudfront-is-mobile-viewer":"false","cloudfront-is-smarttv-viewer":"false","cloudfront-is-tablet-viewer":"false","cloudfront-viewer-country":"US","content-type":"application/x-www-form-urlencoded","host":"yr301kfzx5.execute-api.us-west-2.amazonaws.com","user-agent":"Slackbot 1.0 (+https://api.slack.com/robots)","via":"1.1 5302a26a4ce3d0863fddf10b3dbc2c77.cloudfront.net (CloudFront)","x-amz-cf-id":"6YX72UANMY5YChCwU6sgSA4rnrw5CHVCvri7Zd0xylTO5NyruefAng==","x-amzn-trace-id":"Root=1-593d3aa1-72edb8ee6220ec5d3e8b9a94","x-forwarded-for":"52.54.222.230, 54.182.230.44","x-forwarded-port":"443","x-forwarded-proto":"https"},"lambdaContext":{"callbackWaitsForEmptyEventLoop":false,"logGroupName":"/aws/lambda/dogbot","logStreamName":"2017/06/11/[$LATEST]19fed23fff2e4f188ab8efc0de57f845","functionName":"dogbot","memoryLimitInMB":"128","functionVersion":"$LATEST","invokeid":"622a3b7f-4ea3-11e7-b43e-37bf48ab8ac1","awsRequestId":"622a3b7f-4ea3-11e7-b43e-37bf48ab8ac1","invokedFunctionArn":"arn:aws:lambda:us-west-2:574709716637:function:dogbot:latest"},"proxyRequest":{"resource":"/slack/slash-command","path":"/slack/slash-command","httpMethod":"POST","headers":{"Accept":"application/json,*/*","Accept-Encoding":"gzip,deflate","CloudFront-Forwarded-Proto":"https","CloudFront-Is-Desktop-Viewer":"true","CloudFront-Is-Mobile-Viewer":"false","CloudFront-Is-SmartTV-Viewer":"false","CloudFront-Is-Tablet-Viewer":"false","CloudFront-Viewer-Country":"US","Content-Type":"application/x-www-form-urlencoded","Host":"yr301kfzx5.execute-api.us-west-2.amazonaws.com","User-Agent":"Slackbot 1.0 (+https://api.slack.com/robots)","Via":"1.1 5302a26a4ce3d0863fddf10b3dbc2c77.cloudfront.net (CloudFront)","X-Amz-Cf-Id":"6YX72UANMY5YChCwU6sgSA4rnrw5CHVCvri7Zd0xylTO5NyruefAng==","X-Amzn-Trace-Id":"Root=1-593d3aa1-72edb8ee6220ec5d3e8b9a94","X-Forwarded-For":"52.54.222.230, 54.182.230.44","X-Forwarded-Port":"443","X-Forwarded-Proto":"https"},"queryStringParameters":null,"pathParameters":null,"stageVariables":{"slackToken":"nUp8JM8iOad9yNvItMehrHfV","slackWebhookToken":"nUp8JM8iOad9yNvItMehrHfV","lambdaVersion":"latest"},"requestContext":{"path":"/latest/slack/slash-command","accountId":"574709716637","resourceId":"rslcpb","stage":"latest","requestId":"62261cb5-4ea3-11e7-b7f9-9b817d279b1a","identity":{"cognitoIdentityPoolId":null,"accountId":null,"cognitoIdentityId":null,"caller":null,"apiKey":"","sourceIp":"52.54.222.230","accessKey":null,"cognitoAuthenticationType":null,"cognitoAuthenticationProvider":null,"userArn":null,"userAgent":"Slackbot 1.0 (+https://api.slack.com/robots)","user":null},"resourcePath":"/slack/slash-command","httpMethod":"POST","apiId":"yr301kfzx5"},"body":"token=nUp8JM8iOad9yNvItMehrHfV&team_id=T5A02F3EZ&team_domain=dogdorks&channel_id=C5ANC8RGF&channel_name=app-testing&user_id=U59A0KXMX&user_name=dave&command=%2Fdogbot&text=-debug+-verbose&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT5A02F3EZ%2F195292007632%2F0uJcZy58Qz7jDFs6kGQD2yle","isBase64Encoded":false},"queryString":{},"env":{"slackToken":"nUp8JM8iOad9yNvItMehrHfV","slackWebhookToken":"nUp8JM8iOad9yNvItMehrHfV","lambdaVersion":"latest"},"headers":{"Accept":"application/json,*/*","Accept-Encoding":"gzip,deflate","CloudFront-Forwarded-Proto":"https","CloudFront-Is-Desktop-Viewer":"true","CloudFront-Is-Mobile-Viewer":"false","CloudFront-Is-SmartTV-Viewer":"false","CloudFront-Is-Tablet-Viewer":"false","CloudFront-Viewer-Country":"US","Content-Type":"application/x-www-form-urlencoded","Host":"yr301kfzx5.execute-api.us-west-2.amazonaws.com","User-Agent":"Slackbot 1.0 (+https://api.slack.com/robots)","Via":"1.1 5302a26a4ce3d0863fddf10b3dbc2c77.cloudfront.net (CloudFront)","X-Amz-Cf-Id":"6YX72UANMY5YChCwU6sgSA4rnrw5CHVCvri7Zd0xylTO5NyruefAng==","X-Amzn-Trace-Id":"Root=1-593d3aa1-72edb8ee6220ec5d3e8b9a94","X-Forwarded-For":"52.54.222.230, 54.182.230.44","X-Forwarded-Port":"443","X-Forwarded-Proto":"https"},"pathParams":{},"post":{"token":"nUp8JM8iOad9yNvItMehrHfV","team_id":"T5A02F3EZ","team_domain":"dogdorks","channel_id":"C5ANC8RGF","channel_name":"app-testing","user_id":"U59A0KXMX","user_name":"dave","command":"/dogbot","text":"-debug -verbose","response_url":"https://hooks.slack.com/commands/T5A02F3EZ/195292007632/0uJcZy58Qz7jDFs6kGQD2yle"},"body":"token=nUp8JM8iOad9yNvItMehrHfV&team_id=T5A02F3EZ&team_domain=dogdorks&channel_id=C5ANC8RGF&channel_name=app-testing&user_id=U59A0KXMX&user_name=dave&command=%2Fdogbot&text=-debug+-verbose&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT5A02F3EZ%2F195292007632%2F0uJcZy58Qz7jDFs6kGQD2yle","context":{"method":"POST","path":"/slack/slash-command","stage":"latest","sourceIp":"52.54.222.230","accountId":null,"user":null,"userAgent":"Slackbot 1.0 (+https://api.slack.com/robots)","userArn":null,"caller":null,"apiKey":"","authorizerPrincipalId":null,"cognitoAuthenticationProvider":null,"cognitoAuthenticationType":null,"cognitoIdentityId":null,"cognitoIdentityPoolId":null}};
//console.log(dogbot.respond(message, originalRequest));



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


