require('dotenv').config();

const Order = require('../models/Order');

const getOrders = async (req, res) => {
   try {
      const orders = await Order.find({});
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
      const order = await Order.findById(id);
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
      const { pay, user, products, total } = req.body;
      console.log(products);
      const order = new Order({
         pay,
         products,
         total,
         user
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