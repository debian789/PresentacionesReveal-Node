$(document).ready(function  (argument) {
	// body...
	window.io = io.connect();

	io.on('connect',function(socket){
		console.log('hi');
		io.emit('inicioSesion');


	});

	io.on('estadoSlide',function(req){
		//debugger;
		if (req.derecha === "pasarDerecha"){
			Reveal.right();			
		}else if (req.izquierda === "pasarIzquierda"){
			Reveal.left();
		}
	});

	

//espera que exista un cambio o una recepcion de datos por parte del server 
io.on('cerrar',function(data){

	console.log(data);
});


io.on('validacion',function(data){
		//debugger;
		if (data.autenticado ){
			console.log("usuario auntenticado " + data.autenticado.username )			
			//Reveal.configure({keyboard:true});
			document.onkeydown = function(event){
				console.log(event.which);
				switch(event.which){
				case 39: //derecha 
				io.emit("teclas",{
					tecla:"derecha",
				});
				break;
				case 37: //izquierda
				io.emit("teclas",{
					tecla:"izquierda",
				});
				break;

			}
		};
		debugger;
	    //Reveal.next();
	    Reveal.configure({
	    	keyboard: true,
	    	touch: true

	    });


	    
	}else{
			//Presentacion.Autenticado.User = 'none';
			console.log("datos vacios");
			Reveal.configure({keyboard:false});
		}
	});




io.on('paginaInicial',function(data){
		Reveal.slide(data.pagina);

});


});