

export const  checkoutHandler = async (body) =>{

    const res = await fetch('api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    console.log('res', res);
    const result = await res.json();
    return result.success_url;

}