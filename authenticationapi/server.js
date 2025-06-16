import express from 'express';
import db from './config/db.js';
const app=express();

app.use(express.json());

import auth from './routes/auth.js';
import { PORT } from './config/config.js';

app.use('/api/auth',auth);

app.get('/',(req,res) => {
	res.send("auth is running");
});

db();

app.listen(PORT,() => {
	console.log(`server running on port ${PORT}`);
});