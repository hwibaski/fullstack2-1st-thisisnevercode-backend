import { signInDao } from '../models';
import jwtToken from '../utils/jwt';
import bcrypt from 'bcrypt';
import AppError from '../errors/appError';

const signInUser = async (userInfo) => {
  const userData = await signInDao.getUserInfo(userInfo.email);

  const token = jwtToken.generate({
    id: userInfo.id,
    account: userInfo.email,
  });

  if (!userData) {
    throw new AppError.invalidError('INVALID_INPUT');
  } else {
    const validHashedPsw = await bcrypt.compare(
      userInfo.password,
      userData.password
    );
    // 이메일은 유효한 경우
    if (!validHashedPsw) throw new AppError.invalidError('INVALID_INPUT');
    return token;
  }
};

export default { signInUser };
