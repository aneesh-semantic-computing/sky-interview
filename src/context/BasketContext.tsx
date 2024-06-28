import React, { createContext, useContext, useState, ReactNode, FC } from 'react';

interface BasketProviderProps {
  children: ReactNode;
}

interface BasketContextType {
  basket: string[];
  addToBasket: (id: string) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const BasketProvider: FC<BasketProviderProps> = ({ children }) => {
  const [basket, setBasket] = useState<string[]>([]);

  const addToBasket = (id: string) => {
    setBasket(prevBasket => 
      prevBasket.includes(id) ? 
        prevBasket.filter(item => item !== id) : 
        [...prevBasket, id]
    );
  };

  return (
    <BasketContext.Provider value={{ basket, addToBasket }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

export default BasketProvider;
