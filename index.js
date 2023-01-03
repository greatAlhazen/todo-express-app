import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';

// connection database
const mongoUrl = process.env.URL || 'mongodb://localhost:27017/todos';

connectDatabase(mongoUrl);

// server configuration
const app = express();
dotenv.config();


// listen
const port = process.env.PORT || 3000;


app.listen(port,() =>{
    console.log(`server is running on: ${port}` );
})