import { signInService } from '../services';
import catchAsync from '../utils/catchAsync';
import { validation } from '../utils/checkValidation';
import jwtToken from '../utils/jwt';

const signInUser = catchAsync(async (req, res, next) => {
  const userInfo = req.body;
  const KeyList = ['email', 'password'];

  const emptyError = validation(userInfo, KeyList);
  if (emptyError) next(emptyError);

  const accessToken = await signInService.signInUser(userInfo, res, next);
  const decodedToken = await jwtToken.verify(accessToken);

  accessToken &&
    res.cookie('token', accessToken, {
      expiresIn: process.env.JWT_TTL,
      httpOnly: true,
    });
  accessToken &&
    res.status(200).json({
      status: 'SUCCESS',
      message: '로그인에 성공했습니다',
      Authorization: accessToken,
    });
});

export default { signInUser };
