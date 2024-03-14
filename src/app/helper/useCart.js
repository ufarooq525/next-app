import { useContext, useState, useEffect } from "react";
import { ProductCartContxt } from "../components/Provider";
import { formatCurrency } from "./stripe";

export const useCart = () =>{
    // Oject destructuring
    const {cartItems, setCartItems} = useContext(ProductCartContxt);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);



    useEffect(() => {
        setCartCount(cartItems.length)
        findTotalPrice()
        populateCartItems()

    }, [cartItems])

    const findTotalPrice = () => {
        let totalAmount = 0;
        cartItems.forEach(item => {
           totalAmount += (item.price / 100) * item.quantity
        })

        setCartTotal(totalAmount);
    }

    const populateCartItems = () => {
        if(cartItems.length == 0 ){
            const products = localStorage.getItem('products');
            if(products){
                const temp = JSON.parse(products);
                setCartItems(temp);
            }
        }
    }
    const addItem = (product) => {
    
        const existingProducts = cartItems.findIndex((item)=>item.id === product.id);
        const updatedCart = [...cartItems];
        if(existingProducts != -1){
            updatedCart[existingProducts].quantity += 1;
        }else{
            updatedCart.push({...product, quantity:1});
        }

        localStorage.setItem("products", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    }

    const deleteById = (productId) =>{
        
        const newProducts = cartItems.filter((item)=>item.id != productId);
        console.log("NEw proudcts", newProducts);
        setCartItems(newProducts);
        if(newProducts.length == 0){
            localStorage.removeItem("products");
        }else{
            localStorage.setItem("products", JSON.stringify(newProducts));
        }
    }

    const deleteAll = () => {
        setCartItems([]);
        localStorage.removeItem("products");
    }


    const incrementCartItem  = (productId) =>{
    
        const newProducts = cartItems.map(item => {
            if(item.id === productId){
                return {
                    ...item,
                    quantity:item.quantity + 1
                }
            }else{
                return item;
            }
        })

        localStorage.setItem("products", JSON.stringify(newProducts));
        setCartItems(newProducts); 
    }

    const decrementCartItem  = (productId) =>{
    
        const newProducts = cartItems.map(item => {
            if(item.id === productId && item.quantity > 1){
                return {
                    ...item,
                    quantity:item.quantity - 1
                }
            }else{
                return item;
            }
        })

        localStorage.setItem("products", JSON.stringify(newProducts));
        setCartItems(newProducts); 
    }

    return {findTotalPrice,populateCartItems, addItem, deleteAll, deleteById, incrementCartItem, decrementCartItem, cartCount, cartItems, cartTotal}
}