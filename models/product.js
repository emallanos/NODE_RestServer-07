const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: true
    },
    description: {type: String},
    available: {type: Boolean, default: true},
    image: {type: String}
});

//Quitamos del producto el __v y el state cuando lo devolvemos como json
//en el response, al ser ingresado en la base de datos.
ProductSchema.methods.toJSON = function(){
    const { __v, state, ...product} = this.toObject();
    return product;
}

module.exports = model('Product', ProductSchema);