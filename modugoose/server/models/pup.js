var mongoose=require('mongoose');

var PupSchema=new mongoose.Schema({
	name:String,
	age:Number,
	breed:String
});

var Pup=mongoose.model('Pup',PupSchema);
