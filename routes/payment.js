const { Router } = require('express');
const {createOrder,capOrder,cancel} = require('../controller/payments');

const router = Router();

router.post('/orderBuy',createOrder);

router.get('/getOrder',capOrder);

router.get('/cancel',cancel);
 
 
 
module.exports = router;