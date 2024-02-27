// import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   try {
  //     const fetchProducts = async () => {
  //       const response = await getProducts();
  //       console.log('==== response', response);
  //       setProducts(response);
  //     };
  //     fetchProducts();
  //   } catch (error) {
  //     console.error('==== error', error);
  //   }
  // }, []);

  return (
    <section className='container'>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </section>
  );
}
