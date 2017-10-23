//people.js

var mongoose=require('mongoose');
var Person=mongoose.model('Person');
mongoose.Promise=global.Promise;

module.exports={
	show:function(request,response){
		Person.find({},function(err,people){
			response.json({people:people});
		});
	},

	display:function(request,response){
		Person.find({name:request.params.name},function(err,people){
			response.json({people:people});
		});
	},
	
	add:function(request,response){
		var person=new Person({name:request.params.name});
		person.save(function(err,people){
			if(err){
				console.log(err);
			}
			response.redirect('/');
		});
	},

	destroy:function(request,response){
		Person.remove({name:request.params.name},function(request,err){
			if(err){
				console.log(err);
			}
			response.redirect('/');
		});
	},
}
