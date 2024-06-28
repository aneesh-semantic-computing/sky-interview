import React from 'react';
import { Product, Pricing } from '../types';

interface ProductCardProps {
  product: Product;
  pricing: Pricing;
  isInBasket: boolean;
  onToggleBasket: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, pricing, isInBasket, onToggleBasket }) => {
  return (
    <div className={`product-card ${isInBasket ? 'in-basket' : ''}`} onClick={() => onToggleBasket(product.id)}>
      <h3>{product.name}</h3>
      <p>Type: {product.type}</p>
      <p>Price: ${pricing.price}</p>
      <button>{isInBasket ? 'Remove from Basket' : 'Add to Basket'}</button>
    </div>
  );
};

export default ProductCard;
