const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
   const token = req.header('x-token');

   if (!token) {
      return res.status(500).json({
         ok: 'false',
         msg: 'No hay token en la validacion'
      });
   }

   try {
      const { id, name, lastName, email, city, address, phone, role } = jwt.verify(
         token,
         process.env.SECRET_JWT_SEED
      );

      req.uid = id;
      req.name = name;
      req.lastName = lastName;
      req.email = email;
      req.city = city;
      req.address = address;
      req.phone = phone;
      req.role = role;

   } catch (error) {
      return res.status(401).json({
         ok: false,
         msg: 'Token no valido'
      })
   }

   next();
}

module.exports = {
   validateJWT
}