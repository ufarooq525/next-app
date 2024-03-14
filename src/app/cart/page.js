"use client";
import React, {useEffect} from 'react'
import { MinusIcon, PlusIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useCart } from '../helper/useCart';
import { formatCurrency } from '../helper/stripe';
import { checkoutHandler } from '../services/checkoutHandler';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

function Cart() {
    const {cartCount, cartItems, cartTotal, decrementCartItem, incrementCartItem, deleteAll, deleteById} = useCart()
    const router = useRouter()
    const cartCheckout = async () =>{
        try{
            const body = cartItems.map((item) =>{
                return {
                    price: item.price_id,
                    quantity: item.quantity
                }
            })
            const url = await checkoutHandler(body);
            router.push(url);
        }catch(err){
            console.log('err', err);
        }

    }

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            toast.success('Order placed! You will receive an email confirmation.');
            deleteAll();
        }
    
        if (query.get('canceled')) {
            toast.error('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
    return (
        <div className='m-5 px-20'>
            <Toaster />
            {cartCount > 0 ? (
                <>
                    <h2 className='text-4x1 font-semibold'>Cart items : {cartCount}</h2>
                    <button onClick={deleteAll} className='text-green-400 mt-5 hover:cursor-pointer font-bold'>
                        Clear All <TrashIcon className='inline-block h-4' />
                    </button>
                </>
            ) : (
                <>
                    <h2 className='text-4x1 font-semibold'>You cart is empty</h2>
                    <Link href={'/products'} className='text-xl mt-2 text-green-800 underline' > Back to Products
                    </Link>
                </>

            )
            }

            {cartCount > 0 && (
                <div>
                    {
                        cartItems.map((item) => {
                            return (
                                <div className='flex justify-between border rounded-md p-4 my-2 bg-white hover:shadow-lg'>
                                    <Link href={`/products/${item.id}`} className='flex items-center'>
                                        <img src={`${item.image}`} className='w-20 h-auto' />
                                        <p className='font-semibold text-xl ml-2'>{item.name}</p>
                                    </Link>
                                    <div className='flex items-center gap-5'>
                                        <div className='flex items-center gap-3'>
                                            <button onClick={() => {decrementCartItem(item.id)}} className='p-1 rounded-md text-green-500 hover:bg-green-800 disabled:cursor-not-allowed'>
                                                <MinusIcon className='w-6 h-6' />
                                            </button>
                                            <p className='font-semibold'>{item.quantity}</p>
                                            <button onClick={() => {incrementCartItem(item.id)}} className='p-1 rounded-md text-green-500 hover:bg-green-800 disabled:cursor-not-allowed'>
                                                <PlusIcon className='w-6 h-6' />
                                            </button>
                                        </div>
                                        <p>x <span className='text-xl font-semibold'> {formatCurrency(item.price)}</span></p>
                                        <button onClick={() => {deleteById(item.id)}} className=' text-green-500 hover:bg-green-800'>
                                            <XCircleIcon className='w-6 h-6' />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    

                    <div className='flex flex-col items-end border-t py-4 mt-8'>
                        <p className='text-xl'>
                           Total <span className='text-green-500'>{cartTotal}</span>
                        </p>
                        <button onClick={cartCheckout} className='mt-4 py-2 px-6 bg-green-500 text-white hover:bg-black rounded-md'>
                            Checkout
                        </button>
                    </div>
                </div>
            )

            }
        </div>

    )
}

export default Cart