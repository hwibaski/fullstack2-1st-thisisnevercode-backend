import { signInService } from '../services';
import {
  checkEmptyKeyOfValue,
  checkEmptyKey,
  validateOfInput,
} from '../utils/checkValidation';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import jwtToken from '../utils/jwt';

const signInUser = catchAsync(async (req, res, next) => {
  const userInfo = req.body;
  const KeyList = ['email', 'password'];

  const keyAndValue = validateOfInput(userInfo);
  console.log(keyAndValue);

  const emptyKey = checkEmptyKey(KeyList, userInfo);
  if (emptyKey.length !== 0) {
    next(new AppError.keyError(`${emptyKey} 키가 비어있습니다`));
  }

  const emptyKeyOfValue = checkEmptyKeyOfValue(userInfo);
  if (emptyKeyOfValue) {
    next(new AppError.valueOfKeyError(`${emptyKeyOfValue}을 입력해주세요`));
  }

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
