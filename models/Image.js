const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
    imageURL: {
        type: String,
        require: true
    },
    public_id: {
        type: String,
        require: true
    },
    productOwner: {
        type: Schema.Types.ObjectId,
        require: true
    }
});

ImageSchema.method('toJSON', () => {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('image', ImageSchema);