var express=require("express");
var app=express();

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true}));

var path=require("path");
app.use(express.static(path.join(__dirname, "./static")));
app.set("views",path.join(__dirname,"./views"));
app.set("view engine","ejs");

var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/quoting_dojo");
mongoose.Promise=global.Promise;

var QuoteSchema=new mongoose.Schema({
	quote:{type:String,required:true,minlength:6},
	name:{type:String,required:true,minlength:3},
	time:{type:Date,default:Date.now},
},{timestamps:true});

mongoose.model("Quote",QuoteSchema);
var Quote=mongoose.model("Quote");

app.get('/',function(request,response){
	response.render("index");
})

app.post("/quotes",function(request,response){
	console.log("POST DATA",request.body);
	var quote=Quote({quote:request.body.quote,name:request.body.name});
	quote.save(function(err){
		if(err){
			console.log("something went wrong");
			response.render("errors",{err:err});
		} else{
			console.log("successfully added quote!");
			response.redirect("/quotes");
		}
	})
})

app.get('/quotes',function(request,response){
	Quote.find({},function(err,quotes){
		if(err){
			console.log("something went wrong");
		} else{
			response.render("quotes",{quotes:quotes});
		}
	}).sort({'time':-1})
})

app.listen(8000,function(){
	console.log("listening on port 8000");
})
