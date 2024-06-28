import React from 'react';
import { useBasket } from '../context/BasketContext';
import { Product } from '../types';

interface BasketProps {
  products: Product[];
}

const Basket: React.FC<BasketProps> = ({ products }) => {
  const { basket } = useBasket();

  const basketItems = products.filter(product => basket.includes(product.id));
  const totalPrice = basketItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

  return (
    <div className="basket">
      <h2>Basket</h2>
      {basketItems.length === 0 ? (
        <p>No items in the basket</p>
      ) : (
        <ul>
          {basketItems.map(item => (
            <li key={item.id}>
              {item.name}: ${item.price}
            </li>
          ))}
        </ul>
      )}
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
};

export default Basket;
