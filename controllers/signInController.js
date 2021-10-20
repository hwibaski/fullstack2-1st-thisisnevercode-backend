import { signInService } from '../services';
import { checkEmptyKeyOfValue, checkEmptyKey } from '../utils/checkValidation';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import dotenv from 'dotenv';
import jwtToken from '../utils/jwt';

dotenv.config();

const signInUser = catchAsync(async (req, res, next) => {
  const userInfo = req.body;
  const KeyList = ['email', 'password'];

  const emptyKey = checkEmptyKey(KeyList, userInfo);
  if (emptyKey.length !== 0) {
    next(new AppError.keyError(`${emptyKey} 키가 비어있습니다`));
    return;
  }

  const emptyKeyOfValue = checkEmptyKeyOfValue(userInfo);
  if (emptyKeyOfValue) {
    next(new AppError.valueOfKeyError(`${emptyKeyOfValue}을 입력해주세요`));
    return;
  }

  const accessToken = await signInService.signInUser(userInfo, res, next);
  // 인가 된 사람의 경우
  const decodedToken = await jwtToken.verify(accessToken);
  console.log(decodedToken);

  res.cookie('token', accessToken, {
    expiresIn: process.env.JWT_TTL,
    httpOnly: true,
  });

  if (accessToken) {
    res.status(200).json({
      status: 'SUCCESS',
      message: '로그인에 성공했습니다',
      Authorization: accessToken,
    });
  }
  return;
});

export default { signInUser };
