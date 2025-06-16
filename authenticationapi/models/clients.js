import mongoose from "mongoose";
import users from "../models/user.js";
const clientschema = new mongoose.Schema(
	{
		userid:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"user",
			required:true
		},
		companyname:{
			type:String,
			required:true,
		},
		projects:[String],
	}
);

export default mongoose.model("clients",clientschema);