const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jw = require("jsonwebtoken");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
   try {
      const users = await User.find({});
      return res.status(200).json({
         success: true,
         users,
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const getUser = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findById({ _id: id });
      return res.status(200).json({
         success: true,
         user
      })
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
}

const signUp = async (req, res) => {
   const { password, email } = req.body;
   try {

      let user = await User.findOne({ email });

      if (user) {
         res.status(400).json({
            success: false,
            error: `Usuario ya existente con el correo: ${email}`,
            nameError: 'Correo en uso'
         })
      }

      user = new User(req.body);

      //encriptacion password
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);

      //guardar el usuario en la base de datos
      await user.save();

      //token
      const token = await generateJWT(
         user.id,
         user.name,
         user.lastName,
         user.email,
         user.city,
         user.address,
         user.phone,
         user.role
      );

      return res.status(200).json({
         success: true,
         user: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            city: user.city,
            address: user.address,
            phone: user.phone,
            role: user.role
         },
         token
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const signIn = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(400).json({
            success: false,
            error: 'El correo no se encuentra registrado, por favor verifiquelo o registrese en el sitio.',
            nameError: 'Correo no encontrado'
         });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
         return res.status(400).json({
            success: false,
            error: 'La contraseña del usuario es incorrecta, por favor vuelva a digitarla.',
            nameError: 'Contraseña incorrecta'
         });
      }

      //token
      const token = await generateJWT(
         user.id,
         user.name,
         user.lastName,
         user.email,
         user.city,
         user.address,
         user.phone,
         user.role
      );

      return res.status(200).json({
         success: true,
         user: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            city: user.city,
            address: user.address,
            phone: user.phone,
            role: user.role
         },
         token
      });

   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

const updateUser = async (req, res) => {
   try {
      const { email } = req.params;
      const user = req.body;
      let result = await User.findOne({ email: email });
      result = await User.findOneAndUpdate({ email: email }, {
         $set: {
            name: user.name || result.name,
            lastName: user.lastName || result.lastName,
            city: user.city || result.city,
            address: user.address || result.address,
            phone: user.phone || result.phone,
            role: user.role || result.role
         }
      });
      return res.status(200).json({
         success: true,
         user: result
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
}

const deleteUser = async (req, res) => {
   try {
      const { email } = req.params;
      const user = await User.findOneAndDelete({ email: email });
      return res.status(200).json({
         success: true,
         user
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         error: error.message,
      });
   }
};

module.exports = {
   getUsers,
   signUp,
   signIn,
   updateUser,
   getUser,
   deleteUser
};
