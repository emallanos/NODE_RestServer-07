const { request, response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const loginPost = async (req = request, res = response) => {
    
    const { mail, password } = req.body;

    try {
        const user = await User.findOne({ mail }); 
        
        //Verificar si mail existe
        if(!user){
            return res.status(400).json({
                msg:'Usuario / Passwoord no son correctos - correo'
            });
        }

        //Si el usuario esta activo
        if(!user.state){
            return res.status(400).json({
                msg:'Usuario / Passwoord no son correctos - estado:false'
            });
        }

        //Verficiar la contraseña
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if(!validatePassword){
            return res.status(400).json({
                msg:`El password para el usuario ${user.mail} no es valida`
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.status(200).json({
            user,
            token
        });        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Error en el servidor!'
        });
    }
}

module.exports = {
    loginPost
}