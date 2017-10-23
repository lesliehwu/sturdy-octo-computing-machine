var express = require("express");
var app=express();
app.set("view engine","ejs");

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var path=require("path");
app.use(express.static(path.join(__dirname,'./static')));
app.set("views",path.join(__dirname,"./views"));

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/message_board",function(err,db){
	if(err){
		console.log(err);
	}
});
mongoose.Promise=global.Promise;

var Schema=mongoose.Schema;
var MessageSchema=new mongoose.Schema({
	name:String,
	message:String,
	_comments:[{type:Schema.Types.ObjectId,ref:'Comment'}]
},{timestamps:true});
MessageSchema.path("name").required(true,"Name cannot be blank");
MessageSchema.path("message").required(true,"Message cannot be blank");
mongoose.model("Message",MessageSchema);
var Message=mongoose.model("Message");

var CommentSchema=new mongoose.Schema({
	name:String,
	text:String,
	_message:{type:Schema.Types.ObjectId,ref:"Message"}
},{timestamps:true});
CommentSchema.path("name").required(true,"Name cannot be blank!");
CommentSchema.path("text").required(true,"Comment cannot be blank!");
mongoose.model("Comment",CommentSchema);
var Comment=mongoose.model("Comment");

app.get("/",function(request,response){
	Message.find({},false,true).populate('_comments').exec(function(err,messages){
		response.render("index",{messages:messages});
	});
});

app.post("/message",function(request,response){
	var mess=new Message({name:request.body.name,message:request.body.message});
	mess.save(function(err){
		if(err){
			response.render("index",{errors:mess.errors});
		} else{
			response.redirect("/");
		}
	});
});

app.post("/comment/:id",function(request,response){
	var messID=request.params.id;
	Message.findOne({_id:messID},function(err,message){
		var comm=new Comment({name:request.body.name,text:request.body.comment});
		comm._message=message._id;
		Message.update({_id:message._id},{$push:{_comments:comm}},function(err){});
		comm.save(function(err){
			if(err){
				response.render("index",{errors:comm.errors});
			} else{
				response.redirect("/");
			}
		});
	});
});


app.listen(8000,function(){
	console.log("listening on port 8000");
});
