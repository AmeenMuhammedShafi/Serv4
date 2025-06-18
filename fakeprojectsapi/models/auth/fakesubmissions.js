import mongoose from "mongoose";
import fakeprojects from "../fakeprojects.js";
import students from "./students.js";

const fakesubmissionschema = new mongoose.Schema(
	{
		studentid:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"students"
		},
		projectid:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"fakeprojects"
		},
		desc:{
			type:String,
		},
		status:{
			type:String,
			enum:["assigned","passed","failed","reviewing"]
		},
		deadline:{
			type:Date
		}
	}
);

export default mongoose.model('fakesubmissions',fakesubmissionschema);