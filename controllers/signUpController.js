import { signUpService } from '../services';
import { validation } from '../utils/checkValidation';

const createUser = async (req, res, next) => {
  const userInfo = req.body;
  const KeyList = ['email', 'password', 'name', 'address'];

  const emptyError = validation(userInfo, KeyList);
  if (emptyError) next(emptyError);

  const user = await signUpService.createUser(userInfo, res, next);

  user &&
    res.status(201).json({
      status: 'SUCCESS_SIGNUP',
      message: '회원가입에 성공했습니다.',
    });
};

export default { createUser };
