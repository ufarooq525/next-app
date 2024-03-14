import React from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/productCatalog';

const Products = async () => {
  const products = await getProducts(5);

  return (
    <div className='my-4 mx-12 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'> 
      {
          products.data.map(item => <ProductCard item={item} />)
      }
    
    </div>
  )
}

export default Products