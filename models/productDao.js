import { Prisma } from '.prisma/client';
import prisma from '../prisma';

const getProductById = async (id) => {
  const detailImages = await prisma.$queryRaw`
    SELECT
      key_number as keyNumber,
      di.detail_image_url as detailImg
    FROM
      products P
    LEFT JOIN
      detail_images di
    ON
      di.product_id = p.id
    WHERE
      p.id = ${id}
  `;

  const subImages = await prisma.$queryRaw`
    SELECT
      key_number as keyNumber,
      si.sub_image_url as subImg
    FROM
      products P
    LEFT JOIN
      sub_images si
    ON
      si.product_id = p.id
    WHERE
      p.id = ${id}
  `;

  const [product] = await prisma.$queryRaw`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.description,
      p.textile_information as textileInfo,
      p.main_image_url as mainImg
    FROM 
      products p
    WHERE
      p.id = ${id}
  `;

  if (product) {
    product.detailImg = detailImages;
    product.subImg = subImages;
  }

  return product;
};

const getSubImagesUrlByProductId = async (productId) => {
  const subImageUrl = await prisma.$queryRaw`
    SELECT s.key_number AS keyNumber,
           s.sub_image_url AS subImageUrl,
           s.product_id AS productId
    FROM sub_images s
    INNER JOIN products p
      ON p.id = s.product_id
    WHERE p.id = ${productId};
  `;
  return subImageUrl;
};

const getDetailImagesUrlByProductId = async (productId) => {
  const detailImageUrl = await prisma.$queryRaw`
    SELECT d.key_number AS keyNumber,
           d.detail_image_url AS detailImageUrl,
           d.product_id AS productId
    FROM detail_images d
    INNER JOIN products p
      ON p.id = d.product_id
    WHERE p.id = ${productId};
  `;
  return detailImageUrl;
};

const getProductByTrend = async () => {
  const products = await prisma.$queryRaw`
  SELECT p.id,
         p.name,
         p.price,
         p.main_image_url AS mainImageUrl,
         COUNT(*) AS TOTAL,
         o.product_id
  FROM products p
  LEFT JOIN orders o
  ON p.id = o.product_id
  WHERE MONTH(o.created_at) = MONTH(CURRENT_TIMESTAMP)
  GROUP BY p.id
  ORDER BY TOTAL DESC;
  `;
  return products;
};

const getProductByPriceAndRecent = async (sort, offset) => {
  const products = await prisma.$queryRaw`
  SELECT p.id,
         p.name,
         p.price,
         p.main_image_url AS mainImageUrl
  FROM products p
  ${sort === 'recent' ? Prisma.sql`ORDER BY p.created_at` : Prisma.empty}
  ${sort === 'pricehigh' ? Prisma.sql`ORDER BY p.price DESC` : Prisma.empty}
  ${sort === 'pricelow' ? Prisma.sql`ORDER BY p.price` : Prisma.empty}
  limit 10
  offset ${offset};
  `;
  return products;
};

const getProductBySort = async (sort, offset) => {
  const sortQuery = {
    pricehigh: () => getProductByPriceAndRecent(sort, offset),
    pricelow: () => getProductByPriceAndRecent(sort, offset),
    recent: () => getProductByPriceAndRecent(sort, offset),
    trend: getProductByTrend,
  };

  const products = await sortQuery[sort]();

  const productIdArr = [];
  for (const product of products) {
    productIdArr.push(product.id);
  }

  for (const [i, id] of productIdArr.entries()) {
    products[i].subImage = await getSubImagesUrlByProductId(id);
    products[i].detailImage = await getDetailImagesUrlByProductId(id);
  }
  return products;
};

export default { getProductById, getProductByTrend, getProductBySort };
