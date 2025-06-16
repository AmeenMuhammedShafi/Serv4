import mongoose from "mongoose";

const userschema = new mongoose.Schema(
	{
		username:{
			type:String,
			unique:true,
			required:true
		},
		password:{
			type:String,
			required:true,
			minlength:6
		},
		email:{
			type:String,
			unique:true,
			required:true
		},
		role:{
			type:String,
			enum:["student","client","admin"],
			default:"student"
		},	
		joinedat:{
			type:Date,
			default:Date.now,
		}
	}
);

export default mongoose.model("user",userschema);