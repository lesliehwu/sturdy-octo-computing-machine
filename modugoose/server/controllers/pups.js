//pups.js

var mongoose=require('mongoose');
var Pup=mongoose.model('Pup');

module.exports={
	home:function(request,response){
		Pup.find({},function(err,pups){
			response.render('index',{pups:pups});
		});
	},
	
	create:function(request,response){
		var puppo=new Pup({
			name:request.body.name,
			age:request.body.age,
			breed:request.body.breed
		});
		puppo.save(function(err){
			response.redirect('/');
		});
	},

	add:function(request,response){
		response.render('new');
	},

	show:function(request,response){
		Pup.findOne({_id:request.params.id},function(err,pups){
			if(err){
				console.log(err);
			} else{
				response.render('show',{pups:pups});
			}
		});
	},

	edit:function(request,response){
		Pup.update({_id:request.params.id},request.body,function(err,pups){
			Pup.update({_id:request.params.id},request.body,function(err,pups){
				if(err){
					console.log(err);
				} else{
					response.redirect('/');
				}
			});
		});
	},

	update:function(request,response){
		Pup.findOne({_id:request.params.id},function(err,pus){
			if(err){
				console.log(err);
			} else{
				response.render('edit',{pups:pups});
			}
		});
	},

	destroy:function(request,response){
		Pup.remove({_id:request.params.id},function(err,pups){
			if(err){
				console.log(err);
			} else{
				response.redirect('/');
			}
		});
	},
};
