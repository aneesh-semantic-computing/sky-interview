export interface Product {
  id: string;
  name: string;
  type: string;
}

export interface Pricing {
  productId: string;
  price: string;
}

export const customOrder = ['2', '5', '3', '1'];
