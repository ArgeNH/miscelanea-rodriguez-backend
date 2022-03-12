const axios = require('axios');
const { token } = require('morgan');

 
 const createOrder =async (req,res ) =>{
    const { products, value } = req.body;
    console.log(products);
    console.log(value);
     try {
        const order = {
            intent: "CAPTURE",
            //productos
            purchase_units:[
                {
                    amount:{
                        currency_code:"USD",
                        value: value,
                    },
                    items: products,
   
                },
               ],
               application_context: {
                   brand_name:"NaturSalud.life",
                   landing_page: "LOGIN",
                   user_action:"PAY_NOW",
                   return_url:"http://localhost:5000/api/payments/getOrder",
                   cancel_url:"http://localhost:5000/api/payments/cancel",
               },
        };
        const params = new URLSearchParams();
        params.append("grant_type","client_credentials");
        const {
            data:{access_token},
           } = await axios.post(`https://api-m.sandbox.paypal.com/v1/oauth2/token`,
           params,
           {
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            auth:{
               username: process.env.PAYPAL_API_CLIENT,
               password: process.env.PAYPAL_API_SECRET,
            }
        });
       const respom = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`,order,{
           headers:{
               Authorization: `Bearer ${access_token}`
           }
           /* auth:{
                username: process.env.PAYPAL_API_CLIENT,
                password: process.env.PAYPAL_API_SECRET,
            },*/
             
        });
       
        res.json(respom.data); 
      // console.log(respom.data);
     } catch (error) {
         return res.status(500).send('Something goes wrong');
     }
    
};

 const capOrder =async (req,res ) =>{
     const {token,PayerID} =req.query
    const reponse = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,{},{
        auth:{
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET,
        },
    })
    // console.log(token,PayerID);
    console.log(reponse.data);
    return res.redirect('');//link o direccion de la pagian ala cual lo va redireccionar
}
 const cancel =(req,res ) =>{
     res.redirect('')//pagina inicial 
    res.send('cancelar orden')
}

module.exports ={
    capOrder,
    createOrder,
    cancel
}