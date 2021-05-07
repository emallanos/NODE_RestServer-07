const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    state: {
        type: Boolean,
        default:true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
});

//Quitamos de la categoria el __v y el state cuando lo devolvemos como json
//en el response, al ser ingresado en la base de datos.
CategorySchema.methods.toJSON = function(){
    const { __v, state, ...category} = this.toObject();
    return category;
}

module.exports = model('Category', CategorySchema);