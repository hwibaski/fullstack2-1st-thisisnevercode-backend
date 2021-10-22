import { signInService } from '../services';
import { validation } from '../utils/checkValidation';
import jwtToken from '../utils/jwt';

const signInUser = async (req, res, next) => {
  const userInfo = req.body;
  const KeyList = ['email', 'password'];

  const emptyError = validation(userInfo, KeyList);
  if (emptyError) next(emptyError);

  const userWithAccessToken = await signInService.signInUser(userInfo);

  userWithAccessToken &&
    res.cookie('token', userWithAccessToken, {
      expiresIn: process.env.JWT_TTL,
      httpOnly: true,
    });
  userWithAccessToken &&
    res.status(200).json({
      status: 'SUCCESS_LOGIN',
      message: '로그인에 성공했습니다.',
      Authorization: userWithAccessToken,
    });
};

export default { signInUser };
