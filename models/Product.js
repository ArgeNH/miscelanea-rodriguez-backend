const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
   code: {
      type: String,
      require: true,
      unique: true
   },
   nameProduct: {
      type: String,
      require: true
   },
   price: {
      type: Number,
      require: true
   },
   cant: {
      type: Number,
      require: true
   },
   category: {
      type: String,
      require: true,
      default: 'OTROS',
      enum: ['PAPELERIA', 'FARMACIA', 'ASEO', 'HOGAR', 'FERRETERIA', 'OTROS', 'PROMOCION']
   },
   url: {
      type: String,
      require: true
   },
   public_id: {
      type: String
   }
});

module.exports = model('product', ProductSchema);