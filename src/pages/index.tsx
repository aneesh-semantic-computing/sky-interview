import { NextPage, GetServerSideProps } from 'next';
import ProductCard from '../components/ProductCard';
import Basket from '../components/Basket';
import BasketProvider, { useBasket } from '../context/BasketContext';
import { Product, Pricing, customOrder } from '../types';
import { getProductPricing } from '../utils/getProductPricing';

interface HomePageProps {
  products: Product[];
  pricing: Pricing[];
}

const HomePage: NextPage<HomePageProps> = ({ products, pricing }) => {
  const { basket, addToBasket } = useBasket();

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
      <Basket products={sortedProducts} pricing={pricing} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const productsResponse = await fetch('http://localhost:3000/api/products');
  const productsData = await productsResponse.json();

  const pricingResponse = await fetch('http://localhost:3000/api/pricing');
  const pricingData = await pricingResponse.json();

  return {
    props: {
      products: productsData.products,
      pricing: pricingData.pricing,
    },
  };
};

const App: NextPage<HomePageProps> = (props) => (
  <BasketProvider>
    <HomePage {...props} />
  </BasketProvider>
);

export default App;
