import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';

const getPricing = (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = join(process.cwd(), 'src', 'data', 'pricing.json');
  const jsonData = readFileSync(filePath, 'utf8');
  const pricing = JSON.parse(jsonData);

  res.status(200).json(pricing);
};

export default getPricing;
