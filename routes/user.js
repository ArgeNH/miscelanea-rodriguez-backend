const { Router } = require('express');
const {
    newUser,
    getUsers,
    signUp,
    signIn,
    updateUser,
    getUser } = require('../controller/user');

const router = Router();

//rutas
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', newUser);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.patch('/:email', updateUser);

module.exports = router;