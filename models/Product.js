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
    image: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Image'
        }
    ]
});

ProductSchema.method('toJSON', () => {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('product', ProductSchema);