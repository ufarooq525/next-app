
import { stripe } from "@/app/helper/stripe";
import {headers} from "next/headers";
 
export async function POST(req, res){

    const body = await req.json();

    console.log("body", body);
    console.log("exmaplee", [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1OqaoDBpRHLniRcLgRG3TOZN',
          quantity: 1,
        },
      ]);
    
      
    try {
        console.log('dddada');
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: body,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/cart?success=true`,
            cancel_url: `${req.headers.get('origin')}/cart?canceled=true`,
          });
          console.log(session, 'session');
        return Response.json({success_url: session.url});
      } catch (err) {
        return Response.json({error: 'Internal Server Error', message: err.message}), {status: err.statusCode};
      }

    //   return Response.json({success:'success msg is here'});

}