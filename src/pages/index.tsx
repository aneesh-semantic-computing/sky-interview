import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Basket from '../components/Basket';
import BasketProvider, { useBasket } from '../context/BasketContext';
import { Product, Pricing, customOrder } from '../types';
import { getProductPricing } from '../utils/getProductPricing';

const HomePage: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pricing, setPricing] = useState<Pricing[]>([]);
  const { basket, addToBasket } = useBasket();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        console.log('Fetched products:', productsData.products);
        setProducts(productsData.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const pricingResponse = await fetch('/api/pricing');
        const pricingData = await pricingResponse.json();
        console.log('Fetched pricing:', pricingData.pricing);
        setPricing(pricingData.pricing);
      } catch (error) {
        console.error('Error fetching pricing:', error);
      }
    };

    fetchPricing();
  }, []);

  console.log('Products state:', products);
  console.log('Pricing state:', pricing);

  if (!products.length || !pricing.length) {
    return <div>Loading...</div>;
  }

  const sortedProducts = customOrder
    .map(id => products.find(product => product.id === id))
    .filter((product): product is Product => product !== undefined);

  return (
    <div className="container">
      <div className="product-list">
        {sortedProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            pricing={getProductPricing(product.id, pricing)}
            isInBasket={basket.includes(product.id)}
            onToggleBasket={addToBasket}
          />
        ))}
      </div>
      <Basket products={sortedProducts.map(product => ({
        ...product,
        price: getProductPricing(product.id, pricing).price
      }))} />
    </div>
  );
};

const App: NextPage = () => (
  <BasketProvider>
    <HomePage />
  </BasketProvider>
);

export default App;
