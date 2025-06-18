import jwt from 'jsonwebtoken';
import users from '../models/auth/user.js'; 
import { JWT_SECRET } from '../config/config.js';

const isadmin = async (req,res,next) => {
	const token=req.headers.authorization?.split(" ")[1];
	const decoded = jwt.verify(token,JWT_SECRET);
	const user = await users.findById(decoded.id);
	if (!user || user.role !== "admin")
	{
		return res.status(403).json({msg:"access denied"});
	}
	req.user = user;
	next();
};

export default isadmin;