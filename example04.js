var casper = require('casper').create({
  colorizerType: 'Dummy', // prevent colorize text output
  stepTimeout: 60000, // 1 minute timeout for each step
  timeout: 480000, // 8 minutes timeout for script execution
  viewportSize: { width: 800, height: 600 }
});

var system = require('system'),
    utils = require('utils');

var SAVE_FILES_TO = 'snapshots',
		USERNAME = 'acaceres',
		PASSWORD = 'Fullmonty1974';
var screenShotsCount = 0;

casper.start('https://www.bniconnectglobal.com/web/open/login', function() {
  if (this.exists('form[name=loginbox]')) {
    this.echo('Existe', 'INFO');
		takeSnapshot(this, 'paginaLogeo.png');
  } else {
    this.echo('No existe', 'ERROR');
  }
});

casper.then(function() {
  this.log('Llenando formulario de logeo', 'debug');

  this.evaluate(function(username, password) {
    /*document.querySelector('input[type=text]#j_username').value = username;
    document.querySelector('input[type=password]#j_password').value = password;
    this.click('input[type=submit]#Submit');*/

		$('input[type=text]#j_username').val(username);
    $('input[type=password]#j_password').val(password);
    $('input[type=submit]#Submit').click();

  }, USERNAME, PASSWORD);

  takeSnapshot(this, 'llenandoFormularioLogin.png');

  this.log('Clicking login button..', 'debug');

  if (!this.exists('input[type=submit]#Submit')) {
  	this.log('No existe el boton Login', 'debug');
  } else {
	  //this.click('input[type=submit]#Submit');
	  //$('input[type=submit]#Submit').click();
  }
});

casper.then(function() {
	takeSnapshot(this, 'pantallaBienvenida.png');
})

function takeSnapshot(casperjs, pictureName) {
  screenShotsCount++ ;

  if (SAVE_FILES_TO) {
    casperjs.capture(SAVE_FILES_TO + '/' + screenShotsCount + '.-' + pictureName);
  }
}

/*function implementationOfPageChange(casperjs, reason) {
  logError([
    'Seems that the implementation of the site [' + casperjs.getCurrentUrl() + ']',
    'has changed, please contact with technical support',
    'for review this error. (Reason: ' + reason + ')'
  ].join(' '));

  casperjs.exit(ERROR_EXIT_CODE);
}

function logError(msg) {
  system.stderr.writeLine(msg);
}*/

casper.run();