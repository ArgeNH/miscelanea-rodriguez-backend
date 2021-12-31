const { Router } = require('express');
const multer = require('multer');

const {
    getProducts,
    newProduct,
    getProduct,
    updateProduct,
    deleteProduct } = require('../controller/product');
const upload = multer({ dest: './public' });

const router = Router();

router.get('/', getProducts);
router.post('/', upload.array('image', 1), newProduct);
router.get('/:code', getProduct);
router.patch('/updateProduct/:code', updateProduct);
router.delete('/deleteProduct/:code', deleteProduct);

module.exports = router;