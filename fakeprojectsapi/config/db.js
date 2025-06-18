import mongoose from 'mongoose';
import {MONGO_URI} from './config.js';

const db = async () => {
	try{
		await mongoose.connect(MONGO_URI);
		console.log('mongodb connected');
	}
	catch(err)
	{
		console.error("mongodb connection failed");
	}
};

export default db;
