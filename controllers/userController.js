const { request, response } = require('express');

const usuariosGet = (req = request, res = response) => {
    const { nombre='No name', apellido, id, page=1, limit} = req.query;
    
    res.status(200).json({
        msg: "get API - controlador",
        nombre,
        apellido,
        id,
        page,
        limit
    });
}

const usuariosPost = (req, res) => {
    const { nombre, apellido, edad } = req.body;
    
    res.json({
        msg: "post API - controlador",
        nombre,
        apellido,
        edad
    });
}

const usuariosPut = (req, res) => {
    const { id } = req.params;
    
    res.json({
        msg: "put API - controlador",
        id
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete API - controlador"
    });
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