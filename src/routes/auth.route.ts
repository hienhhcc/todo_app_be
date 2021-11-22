import express from 'express';

import { authUserController } from '../controllers';

const router = express.Router();

router.get('/register', authUserController.register);

export default router;
