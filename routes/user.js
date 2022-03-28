const { Router } = require('express');
const {
   getUsers,
   signUp,
   signIn,
   updateUser,
   getUser,
   deleteUser,
   revalidateToken,
   sendEmail } = require('../controller/user');
const { validateJWT } = require('../middlewares/jwt-validator');

const router = Router();

//rutas
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.patch('/updateUser/:email', updateUser);
router.delete('/deleteUser/:email', deleteUser);
router.get('/sendEmail/:email', sendEmail);

router.get('/token/renew', validateJWT, revalidateToken)

module.exports = router;