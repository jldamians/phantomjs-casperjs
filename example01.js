var casper = require('casper').create();
var WIDTH = 1200;
var HEIGHT = 720;

casper.start('http://162.251.81.233/gps/#/login');

casper.viewport(WIDTH, HEIGHT);

casper.then(function() {
	casper.echo('Load Success');
	casper.capture('page.png', {
		width: WIDTH, 
		height: HEIGHT
	});
});

casper.run();