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
    pricehigh: () => {
      return productDao.getProductBySort('pricehigh', offset);
    },
    pricelow: () => {
      return productDao.getProductBySort('pricelow', offset);
    },
    recent: () => {
      return productDao.getProductBySort('recent', offset);
    },
    trend: () => {
      return productDao.getProductBySort('trend');
    },
  };
  return await sortQuery[sort]();
};

export default { getProductById, getProductBySort };
