const { validationResult } = require('express-validator');
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']    
    },
    mail: {
        type: String,
        required: [true, 'El mail es obligatorio'],
        unique: true    
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']    
    },
    imgage: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Quitamos del usuario el --v y el password cuando lo devolvemos como json
//en el response, al ser ingresado en la base de datos.
UserSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', UserSchema);