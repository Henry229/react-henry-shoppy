// import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import useProducts from '../\bhooks/useProducts';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();
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
