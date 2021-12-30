const { Router } = require('express');
const multer = require('multer');

const { getProducts } = require('../controller/product');
const upload = multer({ dest: './'});

const router = Router();

router.get('/', getProducts);

module.exports = router;