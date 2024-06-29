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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/products`);
    const productsData = await productsResponse.json();

    const pricingResponse = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/pricing`);
    const pricingData = await pricingResponse.json();

    return {
      props: {
        products: productsData,
        pricing: pricingData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        products: [],
        pricing: [],
      },
    };
  }
};

const App: NextPage<HomePageProps> = (props) => (
  <BasketProvider>
    <HomePage {...props} />
  </BasketProvider>
);

export default App;
