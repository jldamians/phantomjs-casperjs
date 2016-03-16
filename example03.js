var casper = require('casper').create();
var TOP = 0;
var LEFT = 0;
var WIDTH = 1200;
var HEIGHT = 1200;
var WAIT = 7000;

// iniciar pagina
casper.start('http://162.251.81.233/gps/', function() {
    if (this.exists('input[ng-model="user.usuario"]')) {
        this.echo('found "user.usuario"', 'INFO');
    } else {
        this.echo('"user.usuario" not found', 'ERROR');
    }

    if (this.exists('input[ng-model="user.clave"]')) {
        this.echo('found "user.clave"', 'INFO');
    } else {
        this.echo('"user.clave" not found', 'ERROR');
    }

	this.viewport(WIDTH, HEIGHT);
	this.capture('1. imgLogin.png', { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT });
});

// setear datos del login
casper.then(function(){
	this.evaluate(function(username, password) {
		$('input[ng-model="user.usuario"]').val(username).trigger('input');
	    $('input[ng-model="user.clave"]').val(password).trigger('input');
	    $('button[type="submit"]').click();
	}, 'rolandotiger@gmail.com', 'tigres2009123');
})

// capturando pantalla de los mapas
casper.then(function(){
	this.wait(WAIT, function(){
	    this.capture('2. imgMapa.png', { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT });
	});
});

// yando al modulo de servicio y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('a[ui-sref="servicio"]').click();
	})

	this.wait(WAIT, function(){
	    this.capture('3. imgServicio.png', { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT });
	});
});

// yendo a la opcion transmision y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('a[ui-sref="transmision"]').click();
	})

	this.wait(WAIT, function(){
	    this.capture('4. imgTransmision.png', { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT });
	});
});

// mostrando 50 registros por pantalla y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('div.busqueda > select[ng-model="items"]').val(50).trigger('change');
	})

	this.wait(WAIT, function(){
	    this.capture('5. imgNroItem.png', { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT });
	});
});

// seleccionando el primer registro y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('div.registro > ul > li:first').click();
	})

	this.wait(WAIT, function(){
	    this.capture('6. imgSelectedItem.png', { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT });
	});
}); 

// mostrando informacion del registro seleccionado y capturando pantalla
casper.then(function(){
	this.evaluate(function(){
		$('div.botonera > button[event-click="informacion()"]').click();
	})

	this.wait(WAIT, function(){
	    this.capture('7. imgSelectedItemInformacion.png', { top: TOP, left: LEFT, width: WIDTH, height: HEIGHT });
	});
}); 

casper.run();