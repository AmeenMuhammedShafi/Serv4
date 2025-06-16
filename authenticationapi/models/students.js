import mongoose from "mongoose";
import users from "../models/user.js";
const studentschema = new mongoose.Schema(
	{
		userid:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"users",
			required:true
		},
		skillsets:{
			required:true,
			type:[String]
		}
	}
);

export default mongoose.model("students",studentschema);