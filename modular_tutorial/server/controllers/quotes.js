var mongoose=require('mongoose');
var Quote=mongoose.model('Quote');

module.exports={
	show:function(request,response){
		Quote.find({},function(err,quotes){
			response.render('quotes',{quotes:quotes});
		});
	},

	create:function(request,response){
		var quote=new Quote({name:request.body.name,quote:request.body.quote});
		quote.save(function(err){
			if(err){
				console.log('something went wrong');
			} else{
				response.redirect('/quotes');
			}
		});
	},
};
