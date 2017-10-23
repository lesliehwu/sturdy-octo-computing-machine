//routes.js

var person=require('../controllers/people.js');
module.exports=function(app){
	app.get('/',function(request,response){
		person.show(request,response);
	});

	app.get('/:name',function(request,response){
		person.display(request,response);
	});

	app.get('/new/:name/',function(request,response){
		person.add(request,response);
	});

	app.get('/remove/:name',function(request,response){
		person.destroy(request,response);
	});
};
