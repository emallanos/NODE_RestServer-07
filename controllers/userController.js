const { request, response } = require('express');
const { encryptPassword } = require('../helpers/shared');
const User = require('../models/user');

const usuariosGet = async (req = request, res = response) => {
    const { desde = 0, limite = 5 } = req.query;
    const filter = { state:true };

    const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        users
    });
}

const usuariosPost = async (req, res) => {
    const { name, mail, password, role } = req.body;
    const user = new User({name, mail, password, role});
    
    user.password = encryptPassword(password);

    //Guardar el usuario en BD
    try {
        await user.save();    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno en el servidor"
        });
    }
    
    res.status(201).json(user);
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, mail, ...resto } = req.body;

    //TO DO validar contra base de datos
    if( password ){
        resto.password = encryptPassword(password);
    }

    const user = await User.findByIdAndUpdate( id, resto, { new:true } );

    res.json(user);
}

const usuariosDelete = async (req, res) => {
    const { id } = req.params;
    
    //Delete Físico de un Usuario
    //const user = await User.findByIdAndDelete( id );

    //Delete Lógico de un Usuario
    const user = await User.findByIdAndUpdate( id, { state: false }, { new:true } );

    res.json(user);
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: "patch API - controlador"
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}