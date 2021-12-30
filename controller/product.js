const cloudinary = require('cloudinary').v2;

const Product = require('../models/Product');
const Image = require('../models/Image');

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
        let product = new Product(req.body);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    getProducts,
    newProduct
}