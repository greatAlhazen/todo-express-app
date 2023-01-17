import express from 'express';
import { createTodo, fetchTodos } from '../controllers/todos.js';

const router = express.Router();

router.get('/',fetchTodos);

router.post('/create',createTodo);

export default router;
