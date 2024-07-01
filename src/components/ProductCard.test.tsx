import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { Product, Pricing } from '../types';

const product: Product = { id: '1', name: 'Product A', type: 'subscription' };
const pricing: Pricing = { productId: '1', price: '58.95' };

describe('ProductCard', () => {
  test('renders product name and price', () => {
    render(
      <ProductCard
        product={product}
        pricing={pricing}
        isInBasket={false}
        onToggleBasket={() => {}}
      />
    );

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText(/58.95/)).toBeInTheDocument();
  });

  test('calls onToggleBasket when clicked', () => {
    const onToggleBasket = jest.fn();

    render(
      <ProductCard
        product={product}
        pricing={pricing}
        isInBasket={false}
        onToggleBasket={onToggleBasket}
      />
    );

    fireEvent.click(screen.getByText('Product A'));

    expect(onToggleBasket).toHaveBeenCalledWith('1');
  });
});
