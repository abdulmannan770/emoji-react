const express = require('express');
const request=require('request');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.get('/basicdetail/:fincode',function(req, res){	
	request('http://company.accordwebservices.com/Company/GetQuotesEOD?FinCode='+req.params.fincode+'&token=UZtbb0G7VHHGLu6uk6L3rCLQkBmM1UJ1', function (error, response, body) {
	    res.send(JSON.parse(body));
	});	    	
});

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.use('/static', express.static('public'));

// Serve the files on port 8000.
app.listen(8000, function () {
    console.log('Example app listening on port 8000!\n');
});