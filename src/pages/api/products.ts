import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';

const getProducts = (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = join(process.cwd(), 'src', 'data', 'products.json');
  const jsonData = readFileSync(filePath, 'utf8');
  const products = JSON.parse(jsonData);

  res.status(200).json(products);
};

export default getProducts;
