import express from 'express';
import { loginPage, registerPage } from '../controllers/auth.js';

const router = express.Router();

router.route('/signup').get(registerPage);

router.route('/signin').get(loginPage);

export default router;