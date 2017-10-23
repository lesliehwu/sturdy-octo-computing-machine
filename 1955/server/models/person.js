//person.js

var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:1955');

var PersonSchema=new mongoose.Schema({
	name:String,
});

var Person=mongoose.model('Person',PersonSchema);
