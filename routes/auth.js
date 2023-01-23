import express from 'express';
import passport from 'passport';
import { forgetPage, forgetPost, loginPage, logout, registerPage, resetPage, signin, signup } from '../controllers/auth.js';

const router = express.Router();

router.route('/signup').get(registerPage).post(signup);

router.route('/signin').get(loginPage).post(passport.authenticate('local',{failureFlash: true,failureRedirect: '/auth/signin'}),signin);

router.post('/logout',logout);

router.route('/forget').get(forgetPage).post(forgetPost);

router.route('/reset/:token').get(resetPage)

export default router;