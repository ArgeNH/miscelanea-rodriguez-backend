const { Router } = require('express');
const {
    newUser,
    getUsers } = require('../controller/user');

const router = Router();

//rutas
router.get('/', getUsers)
router.post('/', newUser);

module.exports = router;