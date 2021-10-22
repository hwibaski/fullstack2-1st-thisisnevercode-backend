import express from 'express';
import { signUpController, signInController } from '../controllers';
import catchAsync from '../utils/catchAsync';
import auth from '../middlewares/authMiddleware';

const router = express.Router();
// 비동기 에러를 잡아주는 랩퍼 함수에 콜백으로 컨트롤러를 넘기는 형태
router.post('/register', catchAsync(signUpController.createUser));
router.post('/login', catchAsync(signInController.signInUser));

router.get('/login/auth', auth.check, catchAsync(signInController.signInUser));

export default router;
