const { Schema, model} = require('mongoose');

const ProductSchema = new Schema({

});

ProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('product', ProductSchema);