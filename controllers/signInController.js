import { signInService } from '../services';
import { validation } from '../utils/checkValidation';

const signInUser = async (req, res, next) => {
  const userInfo = req.body;
  const KeyList = ['email', 'password'];

  const emptyError = validation(userInfo, KeyList);
  if (emptyError) next(emptyError);

  const userWithAccessToken = await signInService.signInUser(
    userInfo,
    res,
    next
  );
  // 인가된 사용자의 정보를 담은 변수
  // const decodedToken = await jwtToken.verify(accessToken);

  userWithAccessToken &&
    res.cookie('token', userWithAccessToken, {
      expiresIn: process.env.JWT_TTL,
      httpOnly: true,
    });
  userWithAccessToken &&
    res.status(200).json({
      status: 200,
      message: 'SUCCESS_LOGIN',
      Authorization: userWithAccessToken,
    });
};

export default { signInUser };
