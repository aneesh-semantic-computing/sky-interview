import { Pricing } from '../types';

export const getProductPricing = (productId: string, pricing: Pricing[]) => {
  return pricing.find(price => price.productId === productId) || { productId, price: 'N/A' };
};
