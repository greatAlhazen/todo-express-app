import express from 'express';
import { createTodo, deleteTodo, fetchTodos, updateTodos, updateTodosPage } from '../controllers/todos.js';
import { authorization } from '../utils/middleware.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/',fetchTodos);

router.post('/create',
[body('title')
.isString()
.isLength({ min:3,max:25 })
.trim()
.withMessage('Please enter title between 1-20 characters')
,body('desc')
.isLength({min:5,max:420})
.trim()
.withMessage('Please enter description between 5 and 420 characters')
,body('schedule').isDate().withMessage('please enter valid date')],
authorization,
createTodo
);

router.route('/:id').get(authorization,updateTodosPage).put(
    [body('title')
    .isString()
    .isLength({ min:3,max:25 })
    .trim()
    .withMessage('Please enter title between 1-20 characters')
    ,body('desc')
    .isLength({min:5,max:420})
    .trim()
    .withMessage('Please enter description between 5 and 420 characters')
    ,body('schedule').isDate().withMessage('please enter valid date')],
authorization,
updateTodos);

router.delete('/:id',deleteTodo)

export default router;
