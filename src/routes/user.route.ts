import express from 'express';

import { userController } from '../controllers';

const router = express.Router();

router.get('/:userId/todos', userController.getAllTodo);

router.post('/:userId/todos', userController.addTodo);

router.patch('/:userId/todos/:todoId', userController.editTodo);

router.delete('/:userId/todos/:todoId', userController.removeTodo);

export default router;
