const axios = require('axios');
const { response } = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const Product = require('../models/Product');

var productsArray = [];
var orderUser = {};

const createOrder = async (req, res = response) => {
   const { value, products, user, pay } = req.body;
   productsArray = products;

   orderUser = {
      pay,
      products,
      total: value,
      user
   }

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
            return_url: `${process.env.DATA_URL}/api/payments/getOrder`,
            cancel_url: `${process.env.DATA_URL}/api/payments/cancel`,
         },
      };
      console.log(process.env.DATA_URL);
      const params = new URLSearchParams();
      params.append("grant_type", "client_credentials");
      const { data: { access_token } } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`,
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
   const { token } = req.query;

   const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
      auth: {
         username: process.env.PAYPAL_API_CLIENT,
         password: process.env.PAYPAL_API_SECRET,
      },
   })
   
   console.log(orderUser);
   await fetch(`${process.env.DATA_URL}/api/order/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         orderUser
      })
   }).then(res => res.json())
      .then(data => {
         console.log(data);
      })
      .catch(err => console.log(err));



   updateProduct(productsArray);
   return res.status(200).redirect('https://www.miscelanearodriguez.life/gracias');
}

const updateProduct = async (array) => {
   try {
      for (let i = 0; i < array.length; i++) {
         let result = await Product.findOne({ code: array[i].code });
         result = await Product.findOneAndUpdate({ code: array[i].code }, {
            $set: {
               cant: result.cant - array[i].counter
            }
         });
      }
      console.log('Productos actualizados');
   } catch (error) {
      console.log(error);
   }
}

const cancel = (req, res) => {
   console.log('Cancelado');
   return res.status(200).redirect('https://www.miscelanearodriguez.life/cancelado');
}

module.exports = {
   capOrder,
   createOrder,
   cancel
}