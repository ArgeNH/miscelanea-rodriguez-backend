const axios = require('axios');
const { response } = require('express');
const { token } = require('morgan');

const createOrder = async (req, res = response) => {
   const { value } = req.body;

   const total = value * 0.00026;
   const totalnotDecimal = Math.ceil(total);

   try {
      const order = {
         intent: "CAPTURE",
         //productos
         purchase_units: [
            {
               amount: {
                  currency_code: "USD",
                  value: totalnotDecimal,
               }
            },
         ],
         application_context: {
            brand_name: "miscelanearodriguez.life",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: "http://localhost:5000/api/payments/getOrder",
            cancel_url: "http://localhost:5000/api/payments/cancel",
         },
      };
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      const {
         data: { access_token },
      } = await axios.post(`https://api-m.sandbox.paypal.com/v1/oauth2/token`,
         params,
         {
            headers: {
               'Content-Type': 'application/json',
            },
            auth: {
               username: process.env.PAYPAL_API_CLIENT,
               password: process.env.PAYPAL_API_SECRET,
            }
         });
      const respom = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders`, order, {
         headers: {
            Authorization: `Bearer ${access_token}`
         }
      });

      return res.status(200).json({
         success: true,
         response: respom.data
      });
      // console.log(respom.data);
   } catch (error) {
      return res.status(500).json({
         success: false,
         error
      });
   }

};

const capOrder = async (req, res) => {
   const { token } = req.query
   const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
      auth: {
         username: process.env.PAYPAL_API_CLIENT,
         password: process.env.PAYPAL_API_SECRET,
      },
   })
   return res.status(200).json({
      success: true,
      message: 'Se hizo la orden',
      response: response.data
   })
}

const cancel = (req, res) => {
   res.redirect('https://www.miscelanearodriguez.life');
}

module.exports = {
   capOrder,
   createOrder,
   cancel
}