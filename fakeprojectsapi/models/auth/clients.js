import mongoose from "mongoose";
import users from './user.js';
const clientschema = new mongoose.Schema(
	{
		userid:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"users",
			required:true
		},
		companyname:{
			type:String,
			required:true,
		},
		projects:
		{
			type:[String],
			default:[]
		}
	}
);

export default mongoose.model("clients",clientschema);