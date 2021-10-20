import { productDao } from '../models';

const getProductById = async (id) => {
  const product = await productDao.getProductById(id);
  if (!product) {
    const err = new Error('NOT_FOUND');
    err.statusCode = 404;
    throw err;
  }
  return product;
};

const getProductBySort = async (sort, offset) => {
  const sortQuery = {
    pricehigh: await productDao.getProductBySort('pricehigh', offset),
    pricelow: await productDao.getProductBySort('pricelow', offset),
    recent: await productDao.getProductBySort('recent', offset),
    trend: await productDao.getProductBySort('trend'),
  };
  return sortQuery[sort];
};

export default { getProductById, getProductBySort };
