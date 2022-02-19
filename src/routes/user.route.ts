import express from 'express';
import passport from 'passport';

import { userController } from '../controllers';
import { requirePassportJWT } from '../configs/passportJWT.config';
import { auth } from '../middlewares/auth.mdw';

const router = express.Router();

requirePassportJWT(passport);

router.get('/:userId/todos', auth(), userController.getAllTodo);

router.post('/:userId/todos', auth(), userController.addTodo);

router.patch('/:userId/todos/:todoId', auth(), userController.editTodo);

router.delete('/:userId/todos/:todoId', auth(), userController.removeTodo);

export default router;
