var express = require('express.io'),
	swig = require('swig'),
	_ = require('underscore');

var server = express();
server.http().io(); // fuciona sokect.io y express :)
var users = [];


//configuracion para rederar vistas
server.engine('html',swig.renderFile); //engine motor de vista
server.set('view engine','html'); //selecciona en view engine para dibuar vista html
server.set('views','./app/view'); //donde estan mis vistas en una carpeta fisica


// Agregar post, cookie y sessiones
server.configure(function(){
	server.use(express.static('./public')); //cargar los archivos estaticos 
	server.use(express.logger());// saber lo que esta pasando logger
	server.use(express.cookieParser());/// recibir datos 
	server.use(express.bodyParser());
	server.use(express.session({secret: '1234567890QWERTY'}));
	


});



var homeController = require('./app/controllers/home');


homeController(server, users);


//Server listen
server.listen(3000);
console.log('url : http://127.0.0.1:3000')