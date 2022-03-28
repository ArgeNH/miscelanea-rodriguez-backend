const axios = require('axios');
const { response } = require('express');
const nodemailer = require('nodemailer');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const Product = require('../models/Product');

var productsArray = [];
var orderUser = {};

let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
   }
});

const createOrder = async (req, res = response) => {
   const { value, products, user, pay } = req.body;
   productsArray = products;

   orderUser = {
      pay,
      products,
      total: value,
      user,
      email
   }
   console.log("🚀 ~ file: payments.js ~ line 21 ~ createOrder ~ email", email)

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

   const productsId = orderUser.products.map(product => product._id);
   const productsCounter = orderUser.products.map(product => product.counter);

   const email = orderUser.email;

   await fetch(`${process.env.DATA_URL}/api/order/`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         pay: orderUser.pay,
         products: productsId,
         total: orderUser.total,
         user: orderUser.user,
         cant: productsCounter
      })
   }).then(res => res.json())
      .then(data => {
         let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Compra realizada',
            html: `
            <h1>Compra realizada</h1>
            <p>
               Gracias por comprar en 
               <a href="miscelanearodriguez.life" target="_blank" rel="noreferrer">
               miscelanearodriguez.life
               </a>
            </p>
            <p>
               Total:
               <strong>
                  ${orderUser.total}
               </strong>
            </p>
            <p>
               Le avisaremos cuando el producto esté listo.
            </p>
            `
         };
         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
            }
         });
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