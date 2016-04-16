# NodeJS-SQS
Tutorial for using AWS SQS with Node.Js

Intalling Node.js in Amazon Linux
rpm -Uvh https://rpm.nodesource.com/pub_5.x/el/7/x86_64/nodesource-release-el7-1.noarch.rpm

Install NodeJS
yum install nodejs

Update queueURL once Queue is created
Update receipt once you get the ReceiptHandle after receiving Message to process that particular message
