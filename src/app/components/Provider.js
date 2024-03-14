"use client";
import { createContext, useState } from "react"

export const ProductCartContxt = createContext(null);
export const Provider = ({ children} ) => {
    const [cartItems, setCartItems] = useState([]);
    return (
        <ProductCartContxt.Provider value={{cartItems, setCartItems}}>
            {children}
        </ProductCartContxt.Provider>
  )
}

