import express from 'express';

import { authUserController } from '../controllers';

const router = express.Router();

router.post('/register', authUserController.register);

router.post('/login', authUserController.login);

export default router;
