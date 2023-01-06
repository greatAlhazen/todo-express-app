import express from 'express';
import { loginPage, registerPage, signup } from '../controllers/auth.js';

const router = express.Router();

router.route('/signup').get(registerPage).post(signup);

router.route('/signin').get(loginPage);

export default router;