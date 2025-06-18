import jwt from 'jsonwebtoken';
import users from '../models/auth/user.js'; 
import students from '../models/auth/students.js';
import {JWT_SECRET} from '../config/config.js';

const isstudent = async (req,res,next) => {
	const token=req.headers.authorization?.split(" ")[1];
	const decoded = jwt.verify(token,JWT_SECRET);
	const user = await users.findById(decoded.id);
	if (!user || user.role !== "student")
	{
		return res.status(403).json({msg:"access denied"});
	}
	const stud = await students.findOne({userid:user._id});
	req.user = stud;
	next();
};

export default isstudent;