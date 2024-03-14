import {Stripe} from 'stripe';
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


export const formatCurrency = (amount) =>  `$${amount/100}`