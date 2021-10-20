import AppError from '../errors/appError';

export const validation = (userInfo, KeyList) => {
  const { email, password, name, address } = userInfo;
  const essentialInfo = { email, password, name, address };
  const keys = Object.keys(userInfo);

  // undefined, null, ''(빈스트링) 모두 잡을 수 있도록 essentialInfo[key]가 false인 경우 반환하도록
  const emptyInfoValue = keys.filter((key) => !essentialInfo[key]);
  const emptyInfoKey = KeyList.filter((key) => keys.indexOf(key) === -1);

  if (emptyInfoKey.length !== 0) {
    return new AppError.keyError(`${emptyInfoKey}_KEY_EMPTY`);
  }
  if (emptyInfoValue.length !== 0) {
    return new AppError.valueOfKeyError(`${emptyInfoValue}_VALUE_EMPTY`);
  }
};
