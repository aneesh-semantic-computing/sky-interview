export interface Product {
  id: string;
  name: string;
  type: string;
}

export interface Pricing {
  productId: string;
  price: string;
}

export const customOrder = ['15', '12', '3', '8', '5', '2', '1', '14', '9', '6', '13', '4', '10', '7', '11'];
