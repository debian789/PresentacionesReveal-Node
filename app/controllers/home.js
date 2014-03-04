var _       = require('underscore');
//Usuario = require('../models/usuario');

//crar un modulo 
var homeControllers = function  (server,users) {
	console.log('controllers home cargado ');


	var instLoggedInLocal = function(req, res, next){
		//debugger;
		if (req.session.usuario){

			res.redirect('/');
		return ;
		}

		next();

	}



	server.get('/',function (req, res){
		//dibuja la view home
		
		res.render('presentacion');
		//debugger;
	});

	server.get('/iniciar',instLoggedInLocal,function(req, res){
		res.render('autorizacion');
	});

	server.get('/crear',function(req, res){
		res.render('crearUsers');
	});

	server.post('/create-user',function(req, res){

		res.redirect('/iniciar')

	});
	

	server.post('/log-in',function (req, res){
		users.push(req.body.userName);
		req.session.user = req.body.userName;
		res.redirect('/'); //redirect por defecto es get
	});

	server.post('/log-in-local',function(req, res){
	if (req.body.usuario === 'angel'){
		req.session.user = req.body.usuario;
		//debugger;
	} 

		res.redirect('/');
		//debugger;
	});	


	server.get('/log-out',function (req, res){
		users = _.without(users,req.session.user); //quitar del arreglo el usuario espesifico 
		req.session.destroy();
		res.redirect('/');
	});




	server.io.route('inicioSesion',function(req){
		//debugger;
		var userSession="";

			userSession = req.session.user;
		server.io.broadcast('paginaInicial',{
		 	pagina : 0
		 });



		req.io.emit('validacion',{
			//autenticado:req.session.user,
			autenticado:userSession
		});
	});



	server.io.route('teclas',function(req){
		//debugger;
		if (req.data.tecla === 'derecha'){
			req.io.socket.broadcast.emit('estadoSlide',{
				derecha:'pasarDerecha',
				izquierda:'sinPasar'
			});
		}else if(req.data.tecla === 'izquierda') {

			req.io.socket.broadcast.emit('estadoSlide',{
				derecha:'sinPasar',
				izquierda:'pasarIzquierda',
			});
		}
	});

};

//module es como el document el windows del brouser acceder a un objeto global
module.exports = homeControllers;
