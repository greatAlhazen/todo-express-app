import express from 'express';
import { registerPage } from '../controllers/auth.js';

const router = express.Router();

router.route('/signup').get(registerPage)

export default router;