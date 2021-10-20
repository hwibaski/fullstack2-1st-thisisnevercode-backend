import express from 'express';
import { signUpController } from '../controllers';
import { signInController } from '../controllers';
import auth from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/register', signUpController.createUser);
router.post('/login', signInController.signInUser);
router.post('/login/auth', auth.check, signInController.signInUser);

export default router;
