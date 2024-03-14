import {revalidatePath} from "next/cache";
export async function POST(req, res){
    let body = await req.text();
    const signature = req.headers.get('stripe-signature');
    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if(event.type === 'products.created' || event.type === 'products.updated'){
        console.log('event type ' + event.type);
       revalidatePath('products', 'page');
       revalidatePath('products/[id]', 'page');
       revalidatePath('/', 'page');
    }else{
        console.log('event is no handled', event.type);
    }

    Response.json({
        "message": "successs"
    });

}