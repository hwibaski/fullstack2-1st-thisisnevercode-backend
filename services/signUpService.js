import { signUpDao } from '../models';
import AppError from '../errors/appError';
import bcrypt from 'bcrypt';

const makeHashedPsw = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashedPsw = await bcrypt.hash(password, salt);
  return hashedPsw;
};

const createUser = async (userInfo) => {
  const registeredUserEmail = await signUpDao.getUserInfoByEmail(
    userInfo.email
  );
  if (registeredUserEmail) {
    throw AppError.duplicatedError('DUPLICATED_EMAIL');
  } else {
    userInfo.password = await makeHashedPsw(userInfo.password);
    const newUser = await signUpDao.createUser(userInfo);
    return newUser;
  }
};

export default { createUser };
