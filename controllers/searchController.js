const { request, response } = require('express');
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models');

const allowedCollections = [
    "categorias",
    "productos",
    "roles",
    "usuarios"
];

const searchUser  = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid( termino );

    //Busca por id si el termino es un id de Mongo
    if(isMongoId){
        const usuario = await User.findById(termino);
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    }

    //Convierte el temrino en una expresion regular con case insensitive
    const regex = new RegExp( termino, 'i' );

    //Busqueda del termino regex por nombre o email en un usuario
    const usuarios = await User.find({
        $or:[{ name: regex }, { mail: regex }],
        $and:[{ state: true }]
    });

    res.json({
        results: usuarios
    });
}

const searchCategory  = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid( termino );

    //Busca por id si el termino es un id de Mongo
    if(isMongoId){
        const category = await Category.findById(termino)
            .populate({ path: 'user', select: 'name' });

        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    //Convierte el temrino en una expresion regular con case insensitive
    const regex = new RegExp( termino, 'i' );

    //Busqueda del termino regex por nombre en una categoria
    const categoria = await Category.find({ name: regex, state: true })
        .populate({ path: 'user', select: 'name' });

    res.json({
        results: categoria
    });
}

const searchProduct  = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid( termino );

    //Busca por id si el termino es un id de Mongo
    if(isMongoId){
        const product = await Product.findById(termino)
            .populate({ path: 'user', select: 'name' })
            .populate({ path: 'category', select: 'name' });

        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    //Convierte el temrino en una expresion regular con case insensitive
    const regex = new RegExp( termino, 'i' );

    //Busqueda del termino regex por nombre en un producto
    const product = await Product.find({ name: regex, state: true })
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'category', select: 'name' });

    res.json({
        results: product
    });
}

const search = (req = request, res = response) => {
    
    const { coleccion, termino } = req.params;

    if(!allowedCollections.includes(coleccion)){
        res.status(400).json({
            msg: `Las colecciones permitidas son ${allowedCollections}`
        });
    }

    switch (coleccion) {
        case "categorias":
            searchCategory(termino, res);
            break;
        case "productos":
            searchProduct(termino, res);
            break;
        case "usuarios":
            searchUser(termino, res);
            break;
        default:
            res.status(500).json({
                msg:"Error interno en el servidor al realizar Búsqueda"
            });
    }
}

module.exports = {
    search
}