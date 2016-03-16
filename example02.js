var casper = require('casper').create({
    clientScripts:  [
        'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js'
    ]
});
var WIDTH = 1200;
var HEIGHT = 720;

casper.start('https://www.google.com.pe/');

casper.viewport(WIDTH, HEIGHT);

casper.then(function(){
	casper.fill('form[action="/search"]', {
		'q': 'casperjs'
	}, true)
});

casper.then(function(){
	casper.echo('Load Google...');
	casper.capture('oauth.png', {
        top: 0,
        left: 0,
		width: WIDTH, 
		height: HEIGHT
	});
});

casper.run();