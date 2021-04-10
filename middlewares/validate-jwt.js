const { request, response, json } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    //Valida si se ingreso el token como header.
    if(!token){
        return res.status(401).json({
            msg:'No se ha ingresado un token en la aplicación',
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const authenticatedUser = await User.findById(uid);
        
        //Verifica si el usuario de Autenticación existe en BD.
        if(!authenticatedUser){
            return res.status(401).json({
                msg:'Token no válido - El usuario de autenticación no existe',
            }); 
        }

        //Verifica si el usuario de Autenticación fue borrado de BD Logicamente.
        if(!authenticatedUser.state){
            return res.status(401).json({
                msg:'Token no válido - El usuario de autenticación fue eliminado de Base de Datos',
            }); 
        }

        req.authenticatedUser = authenticatedUser;

        next();        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'Token no válido',
        });
    }
}

module.exports = {
    validateJWT
}