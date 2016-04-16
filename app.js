var express = require('express');
var app = express();
var aws = require('aws-sdk');
var queueUrl = "";
var receipt = "";

// Load variables for authentication
aws.config.loadFromPath(__dirname + '/config.json');

// Start SQS
var sqs = new aws.SQS();

// Create Queue
app.get('/createQueue', function(req, res){
	var params = {
		QueueName : "FirstQueue"
	};

	sqs.createQueue(params, function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data)
		}
	});
});


// Get List of Queues
app.get('/listQueue', function(req, res){
	sqs.listQueues(function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data)
		}	
	});
});

// Send message to queue we created earlier
app.get('/sendMessage', function(req,res){
	var params = {
		MessageBody : 'First Message',
		QueueUrl : queueUrl,
		DelaySeconds : 0
	};

	sqs.sendMessage(params, function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data)
		}	
	});
});

// Receive Message from Queue
app.get('/receiveMessage', function(req,res){
	var params = {
		QueueUrl : queueUrl,
		VisibilityTimeout : 600 // 10 min wait time
	};

	sqs.receiveMessage(params, function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data)
		}	
	});
});


// Delete Message from Queue using the message receipt handle
app.get('/deleteMessage', function(req,res){
	var params = {
		QueueUrl : queueUrl,
		ReceiptHandle : receipt 
	};

	sqs.deleteMessage(params, function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data)
		}	
	});
});


//Purge entire Queue
app.get('/purgeQueue', function(req,res){
	var params = {
		QueueUrl : queueUrl,
	};

	sqs.purgeQueue(params, function(err, data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data)
		}	
	});
});

//Start Server
//for IPV6 use '::'
var server = app.listen(80,'::', function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server listing at http://%s:%s',host,port);
});


