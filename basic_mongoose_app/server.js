var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/basic_mongoose");

var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
}, {timestamps: true})
mongoose.model("User", UserSchema);

var User = mongoose.model("User")

mongoose.Promise = global.Promise;

app.get('/', function(request, response){
	User.find({}, function(err, users){
		if(err){
			console.log(err, "E R R O R");
			response.redirect('/');
		}
		else{
			response.render("index", {users:users});
		}
	})
	/*
	User.find({name: "Jessica"], function(err, users){
		//finding all users based on a requirement
	})
	*/

	/*
	User.findOne({}, function(err, user){
		//finding one user
	})
	*/

	/*
	var userInstance = newUser()
	userInstance.name = "Deedle"
	userIinstance.age = 13
	userInstance.save(function(err){
		//create sample user
	})
	*/

	/*
	User.remove({}, function(err){
		//delete all users
	})
	*/

	/*
	User.remove({_id: "UNIQUE ID"}, function(err){
		//delete one user
	})
	*/

	/*
	User.update({name: 'Deeeeeeeedle'}, {name: 'Deedle'}, function(err){
		//one way of updating record
	})
	*/

	/*
	User.find({name: "Deedle"}, function(err, user){
		user.name = "dee"
		user.save(function(err){
			//another way of updating record
		})
	})
	*/
})

app.post("/users", function(request, response){
	console.log("POST DATA", request.body);
	var user = User({name: request.body.name, age: request.body.age});
	user.save(function(err){
		if(err){
			console.log("something went wrong");
		} else {
			console.log("successfully added a user!");
			response.redirect('/');
		}
	})
})

app.listen(8000, function(){
	console.log("listening on port 8000");
})
