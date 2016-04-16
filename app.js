var express = require('express');
var app = express();
var aws = require('aws-sdk');
var queurUrl = "";
var receipt = "";

// Load variables for authentication
aws.config.loadFromPath(__dirname + '/config.json');

// Start SQS
var sqs = new aws.SQS();

// Create Queue
app.get('/create', function(req, res){
	var params = {
		QueueName = "FirstQueue"
	};

	sqs.createQueue(params, function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data)
		}
	};
}
