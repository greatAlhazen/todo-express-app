import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const registerPage = (req,res) =>{
    res.render('register');
};

export const loginPage = (req,res) =>{
    res.render('login');
};
