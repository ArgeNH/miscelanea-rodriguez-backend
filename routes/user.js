const { Router } = require('express');
const {
    newUser,
    getUsers, 
    signUp,
    signIn} = require('../controller/user');

const router = Router();

//rutas
router.get('/', getUsers)
router.post('/', newUser);
router.post('/signup',signUp);
router.post('/signin', signIn);

module.exports = router;