import mongoose from "mongoose";
import students from "../models/auth/students.js";

const fakeprojectschema = new mongoose.Schema(
	{
		difficulty:{
			type:String,
			enum:["easy","medium","difficult"]
		},
		skill:{
			type:String,
			enum:["frontend","backend"],
		},
		desc:{
			type:String,
			required:true
		},
		assignedstudents:{
			type:[mongoose.Schema.Types.ObjectId],
			ref:"students",
			default:[]
		}
	}
);

export default mongoose.model('fakeprojects',fakeprojectschema);