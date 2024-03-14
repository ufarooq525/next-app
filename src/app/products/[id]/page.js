import React from 'react'
import {CheckIcon} from '@heroicons/react/24/solid';
import AddCartBtn from '@/app/components/AddCartBtn';
import { getSingleProduct } from '@/app/services/productCatalog';
import { formatCurrency } from '@/app/helper/stripe';
import Image from 'next/image';
import { PageNotFoundError } from 'next/dist/shared/lib/utils';
import NotFound from '@/app/not-found';

async function SingleProduct({params : {id}}) {
 
  const productDetail = await getSingleProduct(id);
  if(!productDetail){
    return NotFound()
  }

  const virtualProduct = {
    name:productDetail.name,
    description:productDetail.description,
    id:productDetail.id,
    price:productDetail.default_price.unit_amount,
    price_id:productDetail.default_price.id,
    currency: '$',
    image:productDetail.images[0]
  }
  return (
    <div className='m-2 px-20'>
      <div className='flex justify-around items-center flex-wrap'>
        <div className='w-80'>
          <Image
            src={`${productDetail.images[0]}`}
            className='w-full h-auto'
            width={320}
            height={320}
          />
        </div>
        <div className='flex-1 max-w-md border rounded-md shadow-lg p-6 bg-white'>
          <h2 className='text-3x1 font-semibold'>{productDetail.name}</h2>
          <div className='flex pt-2 gap-2'>
            <CheckIcon className='text-lime-500 h-5 w-5' />
            <span className='font-semibold'>In Stock</span>
          </div>
          <div className='mt-4 border-t pt-4'>
            <p className='text-gray-500 '>Price: <span className='text-xl font-semibold text-black'>
            {formatCurrency(productDetail.default_price.unit_amount)}
              </span></p>
          </div>
          <AddCartBtn product={virtualProduct} />
        </div>
      </div>
      <p className='mt-8 text-2x1'>
        {productDetail.description}
      </p>
    </div>
  )
}

export default SingleProduct