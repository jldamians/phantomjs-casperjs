'use strict';

var system = require('system'),
    utils = require('utils');

var casper = require('casper').create({
  colorizerType: 'Dummy', // prevent colorize text output
  stepTimeout: 60000, // 1 minute timeout for each step
  timeout: 480000, // 8 minutes timeout for script execution
  viewportSize: { width: 800, height: 600 },
  onStepTimeout: onStepTimeout,
  onTimeout: onTimeout
});

var ERROR_EXIT_CODE = 1;

var screenShotsCount = 0,
	PAGE_URL = 'http://162.251.81.233/gps/';
	SAVE_TO_FILE = 'snapshots';

var WAIT = 6000;

/*function takeSnapshot(casperjs, pictureName) {
  screenShotsCount++;

  if (SAVE_TO_FILE) {
    casperjs.capture(SAVE_TO_FILE + '/' + screenShotsCount + '.-' + pictureName);
  }
}*/

function onStepTimeout(timeout, stepNum) {
  scriptHasError = true;

  logError([
    'The step (' + stepNum + ') was taking too long (> ' + timeout + 'ms)..',
    'the script was stopped!'
  ].join(' '));

  this.exit(ERROR_EXIT_CODE);
}

function logError(msg) {
  system.stderr.writeLine(msg);
}

function onTimeout(timeout) {
  if (scriptHasError) {
    return;
  }

  logError([
    'The script execution was taking too long (> ' + timeout + 'ms)..',
    'the script was stopped!'
  ].join(' '));

  this.exit(ERROR_EXIT_CODE);
}


// iniciar pagina
casper.start('http://162.251.81.233/gps/', function() {
	//this.echo('Page Loaded', 'debug');


    if (this.exists('input[ng-model="user.usuario"]')) {
        this.echo('found "user.usuario"', 'info');
    } else {
        this.echo('"user.usuario" not found', 'error');
    }

    if (this.exists('input[ng-model="user.clave"]')) {
        this.echo('found "user.clave"', 'info');
    } else {
        this.echo('"user.clave" not found', 'error');
    }

	//takeSnapshot(this, 'initialPage.png');
	this.capture('1. imgLogin.png'/*, { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT }*/);
});

// setear datos del login
casper.then(function(){
	this.evaluate(function(username, password) {
		$('input[ng-model="user.usuario"]').val(username).trigger('input');
	    $('input[ng-model="user.clave"]').val(password).trigger('input');
	    $('button[type="submit"]').click();
	}, '', '');
})

// capturando pantalla de los mapas
casper.then(function(){
	this.wait(WAIT, function(){
	    this.capture('2. imgMapa.png'/*, { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT }*/);
	});
});

// yando al modulo de servicio y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('a[ui-sref="servicio"]').click();
	})

	this.wait(WAIT, function(){
	    this.capture('3. imgServicio.png'/*, { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT }*/);
	});
});

// yendo a la opcion transmision y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('a[ui-sref="transmision"]').click();
	})

	this.wait(WAIT, function(){
	    this.capture('4. imgTransmision.png'/*, { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT }*/);
	});
});

// mostrando 50 registros por pantalla y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('div.busqueda > select[ng-model="items"]').val(50).trigger('change');
	})

	this.wait(WAIT, function(){
	    this.capture('5. imgNroItem.png'/*, { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT }*/);
	});
});

// seleccionando el primer registro y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('div.registro > ul > li:first').click();
	})

	this.wait(WAIT, function(){
	    this.capture('6. imgSelectedItem.png'/*, { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT }*/);
	});
}); 

// mostrando informacion del registro seleccionado y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('div.botonera > button[event-click="informacion()"]').click();
	})

	this.wait(WAIT, function(){
	    this.capture('7. imgSelectedItemInformacion.png'/*, { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT }*/);
	});
}); 

casper.run();