const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const Product = require('../models/Product');

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET_KEY
});

const getProducts = async (req, res) => {
   try {
      const products = await Product.find({});
      return res.status(200).json({
         success: true,
         products
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const newProduct = async (req, res) => {
   try {
      const { public_id, secure_url } = await cloudinary.uploader.upload(req.files[0].path);
      const { code, nameProduct, price, cant, category } = req.body;
      const product = new Product({
         code,
         nameProduct,
         price,
         cant,
         category,
         url: secure_url,
         public_id
      });
      await product.save();
      return res.status(200).json({
         success: true,
         product
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const getProduct = async (req, res) => {
   try {
      const { code } = req.params;
      const product = await Product.find({ code: code });
      if (product.length === 0) {
         return res.status(404).json({
            success: false,
            message: 'Product not found'
         });
      } else {
         return res.status(200).json({
            success: true,
            product
         });
      }
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const updateProduct = async (req, res) => {
   try {
      const { code } = req.params;
      const product = req.body;
      let result = await Product.findOne({ code: code });
      result = await Product.findOneAndUpdate({ code: code }, {
         $set: {
            nameProduct: product.nameProduct || result.nameProduct,
            price: product.price || result.price,
            cant: product.cant || result.cant,
            url: product.url || result.url,
            category: product.category || result.category
         }
      });

      return res.status(200).json({
         success: true,
         product: result
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const deleteProduct = async (req, res) => {
   try {
      const { code } = req.params;
      const product = await Product.findOneAndDelete({ code: code });
      cloudinary.uploader.destroy(product.public_id);
      return res.status(200).json({
         success: true,
         product
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

module.exports = {
   getProducts,
   newProduct,
   getProduct,
   updateProduct,
   deleteProduct
}