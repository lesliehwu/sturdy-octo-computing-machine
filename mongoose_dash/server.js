var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var path=require('path');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'./static')));

app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

mongoose.connect('mongodb://localhost/mongoose_dash');
mongoose.Promise=global.Promise;

var PupSchema=new mongoose.Schema({
	name:{type:String,required:true,minlength:2},
	age:{type:Number,required:true,min:0},
	breed:{type:String,required:true,minlength:3},
},{timestamps:true});

mongoose.model("Pup",PupSchema);
var Pup=mongoose.model("Pup");

//Render index
app.get('/',function(request,response){
	Pup.find({},function(err,pups){
		if(err){
			console.log(err);
		}
		else{
			response.render('index',{pups:pups});
		}
	});
});

//Create new puppo action
app.post('/mongooses',function(request,response){
	var puppo = new Pup({
		name: request.body.name,
		age: request.body.age,
		breed: request.body.breed
	});
	puppo.save(function(err){
		response.redirect('/');
	});
});

//Create new puppo page
app.get('/mongooses/new',function(request,response){
	response.render('new');
});

//Look up specific puppo
app.get('/mongooses/:id',function(request,response){
	Pup.findOne({_id:request.params.id},function(err,pups){
		if(err){
			console.log(err);
		}
		else{
			response.render('show',{pups:pups});
		}
	});
});

//Update specific puppo action
app.post('/mongooses/:id',function(request,response){
	console.log(request.body);
	Pup.update({_id:request.params.id},request.body,function(err,pups){
		if(err){
			console.log(err);
		}
		else{
			response.redirect('/');
		}
	});
});

//Update specific puppo page
app.get('/mongooses/edit/:id',function(request,response){
	Pup.findOne({_id:request.params.id},function(err,pups){
		if(err){
			console.log(err);
		}
		else{
			response.render('edit',{pups:pups});
		}
	});
});

//Delete :(
app.post('/mongooses/destroy/:id',function(request,response){
	Pup.remove({_id:request.params.id},function(err,pups){
		if(err){
			console.log(err);
		}
		else{
			response.redirect('/');
		}
	});
});

app.listen(8000,function(){
	console.log("running on port 8000");
});
