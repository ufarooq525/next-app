"use client"
import React from 'react'
import Link from "next/link";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import { useCart } from '../helper/useCart';
function Navbar() {
  const {cartCount} = useCart();
  return (
    <nav className="bg-white p2 flex justify-between">
        <Link href="/" className="text-orange-500 font-bold text-3x1 mt-3">
            My Ecommerce App
            </Link>
            
            <Link href={'/cart'} className='text-orange-500 px-4 py-2 font-bold hover:text-red-700 hover:cursor-pointer'>
                <ShoppingCartIcon className='h-7 w-7 inline-block'/>
                Cart<span>({cartCount})</span>
            </Link>
    </nav>
  )
}

export default Navbar