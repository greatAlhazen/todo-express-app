import express from 'express';
import passport from 'passport';
import { loginPage, registerPage, signin, signup } from '../controllers/auth.js';

const router = express.Router();

router.route('/signup').get(registerPage).post(signup);

router.route('/signin').get(loginPage).post(passport.authenticate('local',{failureFlash: true,failureRedirect: '/auth/signin'}),signin);

export default router;