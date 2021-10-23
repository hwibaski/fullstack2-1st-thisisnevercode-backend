import jwt from '../utils/jwt';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';

module.exports.check = catchAsync(async (req, res, next) => {
  if (!req.headers.cookie) {
    next(new AppError.checkAuth('인가되지 않은 사용자입니다.'));
    return;
  }

  const accessToken = req.headers.cookie.split(' ')[1];
  console.log(accessToken.slice(6));

  let decoded;
  decoded = await jwt.verify(accessToken.slice(6));

  if (!decoded) {
    next(new AppError.checkJWTAuth('만료된 토큰을 가진 사용자입니다'));
    return;
  } else {
    res.status(200).json({
      message: '인가된 사용자입니다.',
      decoded,
    });
  }
});
