import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/firebase';
import Products from '../components/Products';
import Banner from '../components/Banner';

const Home = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    getProducts() //
      .then(setProducts);
  }, []);

  return (
    <>
      <Banner />
      <Products />
    </>
  );
};

export default Home;
