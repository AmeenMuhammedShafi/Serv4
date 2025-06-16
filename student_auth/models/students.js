import mongoose from "mongoose";

const studentschema = new mongoose.Schema(
	{
		username:{
			required:true,
			type:String,
			unique:true,
		},
		password:{
			required:true,
			type:String,
			minlength:6,
		},
		email:{
			type:String,
			required:true,
			unique:true
		},
		role:{
			required:true,
			enum:["frontend dev","backend dev","fullstack dev"],
			type:String	
		},
		skillsets:{
			required:true,
			type:[String]
		},
		joinedat:{
			type:Date,
			default:Date.now,
		}
	}
);

export default mongoose.model("students",studentschema);