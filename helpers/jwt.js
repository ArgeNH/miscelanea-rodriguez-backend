const jwt = require('jsonwebtoken');

const generateJWT = (id, name, lastName, email, city, address, phone, role) => {
   return new Promise((resolve, reject) => {
      const payload = { id, name, lastName, email, city, address, phone, role };
      jwt.sign(payload, process.env.SECRET_JWT_SEED, {
         expiresIn: '2h'
      }, (err, token) => {
         if (err) {
            console.log(err);
            reject('No se pudo generar el token');
         }
         resolve(token);
      })
   })
}

module.exports = {
   generateJWT
}