const { Router } = require('express');
const {
   getOrders,
   getOrder,
   createOrder,
   updateOrder,
   deleteOrder
} = require('../controller/order');

const router = Router();

//obtener orders desde controller
router.get('/', getOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
router.put('/update/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);

module.exports = router;