import express from 'express';
import users from '../models/auth/user.js';
import fakeprojects from '../models/fakeprojects.js';
import fakesubmissions from '../models/auth/fakesubmissions.js';
import mongoose from 'mongoose';
import students from '../models/auth/students.js';
import isstudent from '../middleware/isstudent.js';
import isadmin from '../middleware/isadmin.js';

const router=express.Router();

router.post('/fakeprojectfill',isadmin,async (req,res) => {
	const { difficulty,skill,desc} = req.body;
	try{
		if (!difficulty || !skill || !desc)
		{
			return res.status(400).json({msg:"incomplete entries"});
		}
		const newfakeproject = await fakeprojects.create({difficulty,skill,desc});
		return res.status(200).json({msg:"fake project successfully added",newfakeproject});
	}
	catch(err)
	{
		return res.status(500).json({msg:"server error"});
	}
});

router.post('/fakeprojectreq',isstudent, async (req,res) =>{
	try{
		const stud = req.user;
		const studskill = stud.skill;
		const difficultylevelscompleted = stud.difficultylevelscompleted;
		const levels = ["easy","medium","difficult"];
		const incompletelevel = levels.filter(level => !difficultylevelscompleted.includes(level));
		if (incompletelevel.length==0) return res.status(200).json({msg:"all tasks completed"});
		const level = incompletelevel[0];
		const task = await fakeprojects.findOne({difficulty:level,skill:studskill});
		task.assignedstudents.push(stud._id);
        await task.save();
		stud.currentprojectid = task._id;
		await stud.save();
		const newsub = await fakesubmissions.create({studentid:stud._id,projectid:task._id,deadline:new Date(Date.now()+7*24*60*60*1000),status:"assigned"});
		return res.status(200).json({desc:task.desc,deadline:newsub.deadline});
	}
	catch(err)
	{
		return res.status(500).json({msg:"server error"});
	}
});

router.post('/fakeprojectsubmission',isstudent,async (req,res) => {
	try{
		const stud = req.user;
		const submission = await fakesubmissions.findOne({studentid:stud._id,projectid:stud.currentprojectid});
		submission.desc = req.body.desc;
		if (Date.now() > submission.deadline)
			{
				submission.status="failed";
			} 
		else submission.status="reviewing";
		await submission.save();
		return res.status(200).json({msg:"submitted for reviewing"});
	}
	catch(err)
	{
		return res.status(500).json({msg:"server error"});
	}
});

router.get('/fakeprojectsubmission',isadmin,async (req,res) => {
	try{
		const submissions = await fakesubmissions.find().populate('studentid projectid');
		res.json(submissions);
	}
	catch(err)
	{
		return res.status(500).json({msg:"server error"});
	}
});

export default router;