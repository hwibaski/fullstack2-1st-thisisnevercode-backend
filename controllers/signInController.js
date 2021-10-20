import { signInService } from '../services';
import catchAsync from '../utils/catchAsync';
import jwtToken from '../utils/jwt';

const signInUser = catchAsync(async (req, res, next) => {
  const emptyError = validation(userInfo);
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
