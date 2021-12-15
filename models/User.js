const { Schema, model } = require('mongoose');
const bcryt = require('bcryptjs')

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
});

UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

/*UserSchema.statics.encryptPassword = async(password) =>{
    const salt = await bcryt.getSalt(10) //el timepo que va a aplica rel recorrido
     return await bcryt.hash(password,salt)//devolvemos el texto cifrado
}
UserSchema.statics.comparapassword = async(password,recePassword) =>{
   return await  bcryt.compare(password,recePassword)
    
}*/
module.exports = model('user', UserSchema);