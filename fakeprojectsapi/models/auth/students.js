import mongoose from "mongoose";
import users from "./user.js";
import fakeprojects from "../fakeprojects.js";
const studentschema = new mongoose.Schema(
	{
		userid:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"users",
			required:true
		},
		skill:{
			required:true,
			type:String,
			enum:["frontend","backend"]
		},
		difficultylevelscompleted:{
			type:[String],
			enum:["easy","medium","difficult"],
			default:[]
		},
		currentprojectid:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"fakeprojects"
		}
	}
);

export default mongoose.model("students",studentschema);