import express from 'express';
import users from '../models/user.js';
import clients from '../models/clients.js';
import students from '../models/students.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config/config.js';

const router=express.Router();

router.post('/register',async (req,res) => {
	const {username,password,email,role} = req.body;
	try{
		if (!username || !password || !email || !role)
		{
			return res.status(400).json({msg:"invalid credentials !!!"});
		}
		const hashedpassword = await bcrypt.hash(password,10);
	    const newuser=await users.create({username,password:hashedpassword,email,role});
		if (role=="student")
		{
			const { skillsets } = req.body;	
			const newstudent=await students.create({userid:newuser._id,skillsets});
		    return res.status(201).json({msg:"registration successful"});
		}
		else if (role=="client")
		{
			const { companyname } = req.body;
			const newclient = await clients.create({userid:newuser._id,companyname});
		    return res.status(201).json({msg:"registration successful"});
		}
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
		const user=await users.findOne({email});
		if (!user)
		{
			return res.status(400).json({msg:"email not found"});
		}
		const ismatch = await bcrypt.compare(password,user.password);
		if (!ismatch)
		{
			return res.status(401).json({msg:"invalid credentials"});
		}
		const token=jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1d'});
		return res.status(200).json({msg:"successfully logged in",token});
	}
	catch(err)
	{
		return res.status(500).json({msg:"server error"});
	}
});

export default router;