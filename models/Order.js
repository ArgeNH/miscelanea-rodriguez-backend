const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
   pay: {
      type: Boolean,
      required: true,
      default: false
   },
   products: [
      {
         type: Schema.Types.ObjectId,
         ref: 'product'
      },
   ],
   total: {
      type: Number,
      required: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
   },
   cant: [
      {
         type: Number,
         required: true
      }
   ]
});

module.exports = model('order', OrderSchema);