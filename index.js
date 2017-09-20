const winston = require('winston');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const argv = require('yargs').argv;
const mongoServerName = argv.mongo;


winston.info('what is argv of yargvs:' + argv);
winston.info(`what is mongo in argv of yargvs: ${mongoServerName}`);


var app = express();

app.use(bodyParser.json()); //to suppor json-enddoded bodies
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authoerization');
	next();
})


var fs = require('fs');
var RouteDir = 'routes';
var files = fs.readdirSync(RouteDir);

files.forEach(function(file){
	var filePath = path.resolve('./', RouteDir, file);
	var route = require(mongoServerName, app);
})


app.listen(8086,function(){
	winston.info('wat_storage is listening on port 8086');
})