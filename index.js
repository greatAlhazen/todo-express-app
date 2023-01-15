import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user.js';
import flash from 'connect-flash';

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

//define url encoded for parsing form data
app.use(express.urlencoded({ extended: true }));

const secret = process.env.SESSION_SECRET;
app.use(session({
    name:'session',
    secret,
    resave: false,
    saveUninitialized: true,
}));




// ejs configuration
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// static folder configuration
app.use(express.static(path.join(__dirname,'public')));


// session configuration


// passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

// flash confguration
app.use(flash());
app.use((req,res,next) =>{
    res.locals.loggedInUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
}) 

// routes configuration
import homeRoute from './routes/home.js';
app.use(homeRoute);
import authRoutes from './routes/auth.js';
app.use('/auth',authRoutes);


// error handling
app.use((err,req,res,next) =>{
    const status = err.status || 500;
    const message = err.message || 'something went wrong';
    return res.status(status).render('error',{
        message,
        status,
        stack: err.stack,
    });
});

// listen
const port = process.env.PORT || 3000;


app.listen(port,() =>{
    console.log(`server is running on: ${port}` );
})