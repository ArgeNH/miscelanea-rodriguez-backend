const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
   name: {
      type: String,
      require: true
   },
   lastName: {
      type: String,
      require: true
   },
   password: {
      type: String,
      require: true
   },
   email: {
      type: String,
      require: true,
      unique: true
   },
   city: {
      type: String,
      require: true
   },
   address: {
      type: String,
      require: true
   },
   phone: {
      type: Number,
      require: true
   },
   role: {
      type: String,
      require: true,
      default: 'CLIENT',
      enum: ['CLIENT', 'ADMIN']
   }
});

module.exports = model('user', UserSchema);