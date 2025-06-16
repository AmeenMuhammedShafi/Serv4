import express from 'express';
import students from '../models/students.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config/config.js';

const router=express.Router();

router.post('/register',async (req,res) => {
	const {username,password,email,role,skillsets,joinedat} = req.body;
	try{
		if (!username || !password || !email || !role || !skillsets)
		{
			return res.status(400).json({msg:"invalid credentials !!!"});
		}
		const hashedpassword = await bcrypt.hash(password,10);
		const newstudent=await students.create({username,password:hashedpassword,email,role,skillsets,joinedat});
		return res.status(201).json({msg:"student registration successful",newstudent});
	}
	catch(err)
	{
		return res.status(500).json({msg:"server error"});
	}
});

router.post('/login', async (req,res) => {
	const { email,password } = req.body;
	try
	{
		if (!email || !password)
	    {
		    return res.status(400).json({msg:"missing data"});
	    }
	    const stud=await students.findOne({email});
		if (!stud)
		{
			return res.status(400).json({msg:"student email not found"});
		}
	    const ismatch = await bcrypt.compare(password,stud.password);
		if (!ismatch)
		{
			return res.status(401).json({msg:"invalid credentials"});
		}
		const token=jwt.sign({id:stud._id},JWT_SECRET,{expiresIn:'1d'});
		return res.status(200).json({msg:"successfully logged in",token});
	}
	catch(err)
	{
		return res.status(500).json({msg:"server error"});
	}
});

export default router;