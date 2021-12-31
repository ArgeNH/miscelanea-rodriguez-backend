const { Router } = require('express');
const {
    newUser,
    getUsers,
    signUp,
    signIn,
    updateUser,
    getUser,
    deleteUser } = require('../controller/user');

const router = Router();

//rutas
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', newUser);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.patch('/updateUser/:email', updateUser);
router.delete('/deleteUser/:email', deleteUser);

module.exports = router;