"use client";

import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '../helper/useCart';


function AddCartBtn({product}) {
    const {addItem} = useCart();
    const handleCart = () => {
        addItem(product)
        toast.success(`${product.name}  Item added into cart`);
    }

    return (
    <div>
        <button onClick={handleCart} className='w-full mt-4 py-2 px-6 bg-green-500 text-white hover:bg-black rounded-md'>
            Add to cart
        </button>
        <Toaster />
    </div>
  )
}

export default AddCartBtn