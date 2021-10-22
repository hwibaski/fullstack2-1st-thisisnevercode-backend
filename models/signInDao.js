import prisma from '../prisma';

const getUserInfo = async (email) => {
  const user = await prisma.$queryRaw`
    SELECT
      u.email, u.password, u.id, u.address
    FROM
      users u
    WHERE
      u.email = ${email}
  ;`;
  if (user.length > 0) {
    const [registeredUserEmail] = user;
    return registeredUserEmail;
  }
};

export default { getUserInfo };
