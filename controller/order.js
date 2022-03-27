require('dotenv').config();

const Order = require('../models/Order');

const getOrders = async (req, res) => {
   try {
      const orders = await Order.find({})
      .populate('user','name lastName');
      return res.status(200).json({
         success: true,
         orders
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const getOrder = async (req, res) => {
   try {
      const { id } = req.params;

      const order = await Order.findById(id)
      .populate('products', 'code nameProduct category price url')
      .populate('user', 'name lastName address email city phone');

      if (!order) {
         return res.status(404).json({
            success: false,
            message: 'Order not found'
         });
      }
      return res.status(200).json({
         success: true,
         order
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const createOrder = async (req, res) => {
   try {
      const { pay, user, products, total, cant } = req.body;
      console.log("🚀 ~ file: order.js ~ line 45 ~ createOrder ~ pay, user, products, total", 
      pay, user, products, total, cant);

      const order = new Order({
         pay,
         products,
         total,
         user,
         cant,
         date: new Date()
      });
      await order.save();
      return res.status(200).json({
         success: true,
         order
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const updateOrder = async (req, res) => {
   try {
      const { id } = req.params;
      const { pay } = req.body;
      const order = await Order.findByIdAndUpdate(id, { pay }, { new: true });
      if (!order) {
         return res.status(404).json({
            success: false,
            message: 'Order not found'
         });
      }
      return res.status(200).json({
         success: true,
         order
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const deleteOrder = async (req, res) => {
   try {
      const { id } = req.params;
      const order = await Order.findByIdAndRemove(id);
      if (!order) {
         return res.status(404).json({
            success: false,
            message: 'Order not found'
         });
      }
      return res.status(200).json({
         success: true,
         order
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

module.exports = {
   getOrders,
   getOrder,
   createOrder,
   updateOrder,
   deleteOrder
};