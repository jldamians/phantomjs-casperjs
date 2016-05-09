var casper = require('casper').create({
  colorizerType: 'Dummy', // prevent colorize text output
  stepTimeout: 60000, // 1 minute timeout for each step
  timeout: 480000, // 8 minutes timeout for script execution
  viewportSize: { width: 800, height: 600 }
});

casper.start('https://www.bniconnectglobal.com/web/open/login/', function() {
	/*this.echo('Page title is: ' + this.evaluate(function() {
		return document.title;
	}), 'INFO'); // Will be printed in green on the console*/
	this.echo('getTitle => ' + this.getTitle());
	this.echo('getCurrentUrl => ' + this.getCurrentUrl());

});


casper.evaluate(function(username, password) {
	document.querySelector('input[type=text]#j_username').value = username;
	document.querySelector('input[type=password]#j_password').value = password;
	document.querySelector('input[type=submit]#Submit').click();
}, 'acaceres', 'Fullmonty1974');


casper.then(function() {
	this.capture('img.png');
});

casper.run();