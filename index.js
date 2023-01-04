import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import path from 'path';

// nodejs version __dirname bug detailed information: https://github.com/nodejs/help/issues/2907
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// connection database
const mongoUrl = process.env.URL || 'mongodb://localhost:27017/todos';

connectDatabase(mongoUrl);

// server configuration
const app = express();
dotenv.config();

// ejs configuration
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// static folder configuration
app.use(express.static(path.join(__dirname,'public')));



// routes configuration
import authRoutes from './routes/auth.js';
app.use('/auth',authRoutes);


// listen
const port = process.env.PORT || 3000;


app.listen(port,() =>{
    console.log(`server is running on: ${port}` );
})