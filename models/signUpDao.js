import prisma from '../prisma';

const createUser = async (userInfo) => {
  const { name, email, password, address } = userInfo;
  return await prisma.$queryRaw`
    INSERT INTO users
      (name, email, password, address)
    VALUES   
      (${name}, ${email}, ${password}, ${address})
    ;`;
};

const getUserInfoByEmail = async (email) => {
  const user = await prisma.$queryRaw`
    SELECT
      u.email, u.password, u.id, u.address, u.name
    FROM
      users u
    WHERE
      u.email = ${email}
  ;`;
  if (user.length > 0) {
    const [result] = user;
    return result;
  }
};

export default { createUser, getUserInfoByEmail };
