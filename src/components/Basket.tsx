import React from 'react';
import { useBasket } from '../context/BasketContext';
import { Product, Pricing } from '../types';

interface BasketProps {
  products: Product[];
  pricing: Pricing[];
}

const Basket: React.FC<BasketProps> = ({ products, pricing }) => {
  const { basket } = useBasket();

  const getPrice = (productId: string) => {
    const productPrice = pricing.find(price => price.productId === productId);
    return productPrice ? parseFloat(productPrice.price) : 0;
  };

  const basketItems = products.filter(product => basket.includes(product.id));
  const totalPrice = basketItems.reduce((total, item) => total + getPrice(item.id), 0).toFixed(2);

  return (
    <div className="basket">
      <h2>Basket</h2>
      {basketItems.length === 0 ? (
        <p>No items in the basket</p>
      ) : (
        <ul>
          {basketItems.map(item => (
            <li key={item.id}>
              {item.name}: ${getPrice(item.id).toFixed(2)}
            </li>
          ))}
        </ul>
      )}
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
};

export default Basket;
