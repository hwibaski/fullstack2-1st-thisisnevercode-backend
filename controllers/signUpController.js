import { signUpService } from '../services';
import catchAsync from '../utils/catchAsync';
import { validation } from '../utils/checkValidation';

const createUser = catchAsync(async (req, res, next) => {
  const userInfo = req.body;
  const KeyList = ['email', 'password', 'name', 'address'];

  const emptyError = validation(userInfo, KeyList);
  if (emptyError) next(emptyError);

  const user = await signUpService.createUser(userInfo, res, next);

  if (user) {
    res.status(201).json({
      status: 'SUCCESS',
      message: '회원가입에 성공했습니다.',
    });
  }
});

export default { createUser };
