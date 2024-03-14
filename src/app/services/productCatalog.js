import { stripe } from "../helper/stripe";

export const getProducts = async (limit) => {

    let products = {
        data: []
    };
    try{
        products =  await stripe.products.list({
            limit:limit || 10,
            expand: ['data.default_price']
        });
    }catch(error){
        console.log("Error From Stripe");
    }

    return products;
}

export const getSingleProduct = async (productId) => {
    let product = null;
    try{
        product =  await stripe.products.retrieve(productId,{
            expand:['default_price']
        });
    }catch(error){
        console.log("Error From Stripe");
    }

    return product;

}