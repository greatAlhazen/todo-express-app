import express from 'express';
import { createTodo, deleteTodo, fetchTodos, updateTodos, updateTodosPage } from '../controllers/todos.js';
import { authorization } from '../utils/middleware.js';

const router = express.Router();

router.get('/',fetchTodos);

router.post('/create',authorization,createTodo);

router.route('/:id').get(authorization,updateTodosPage).put(authorization,updateTodos);

router.delete('/:id',deleteTodo)

export default router;
