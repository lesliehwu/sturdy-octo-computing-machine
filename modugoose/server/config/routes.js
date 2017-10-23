//routes.js

var mongoose=require('mongoose');
var Pup=mongoose.model('Pup');
var pups=require('../controllers/pups.js');

module.exports=function(app){
	app.get('/',function(request,response){
		pups.home(request,response);
	});

	app.post('/mongooses',function(request,response){
		pups.create(request,response);
	});

	app.get('/mongooses/new',function(request,response){
		pups.add(request,response);
	});

	app.get('/mongooses/:id',function(request,response){
		pups.show(request,response);
	});

	app.post('/mongooses/:id',function(request,response){
		pups.edit(request,response);
	});

	app.get('/mongooses/edit/:id',function(request,response){
		pups.update(request,response);
	});

	app.post('/mongooses/destroy/:id',function(request,response){
		pups.destroy(request,response);
	});
}
