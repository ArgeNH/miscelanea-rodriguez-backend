const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
   code: {
      type: String,
      required: true,
      unique: true
   },
   nameProduct: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   cant: {
      type: Number,
      required: true
   },
   category: {
      type: String,
      required: true,
      default: 'OTROS',
      enum: ['PAPELERIA', 'FARMACIA', 'ASEO', 'HOGAR', 'FERRETERIA', 'OTROS', 'PROMOCION']
   },
   url: {
      type: String,
      required: true
   },
   public_id: {
      type: String
   }
});

module.exports = model('product', ProductSchema);