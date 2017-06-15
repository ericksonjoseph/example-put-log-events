'use strict'

var AWS = require('aws-sdk');
var Generator = require('./Generator.js')
var events = require('./events.js')

// Construct
var generator = new Generator(events)
var cloudwatchlogs = new AWS.CloudWatchLogs({
    'region': 'us-east-1'
});

// Get first token
var token = process.argv[2] || null
var batch_size = 10

var params = {
    logGroupName: 'cloud-analytics',
    logStreamName: 'data-stream'
};

// Recursive
var run = function() {

    params.logEvents = []

    for (let i=0; i<batch_size; i++) {
        params.logEvents.push({
            timestamp: new Date().getTime(),
            message: JSON.stringify(generator.get())
        })
    }

    if (token) params.sequenceToken = token

    cloudwatchlogs.putLogEvents(params, function(err, data) {

        if (err) {
            console.log(err, err.stack);
        }

        token = data.nextSequenceToken
        console.log("Success! Next token:", token)
        sleep(1)
        run()
    });
}

function sleep(seconds) {
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){}
}

// Do it!
run()
