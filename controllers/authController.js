const { request, response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSingIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    
    try {
        const { name, image, mail } = await googleVerify(id_token);
        
        let user = await User.findOne({mail});

        if(!user){  
            //Debo crear el usuario
            const data = {name, mail, password: ':P', image, google: true}
            user = new User(data);
            await user.save();
        }

        if(!user.state){
            res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
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
        res.status(400).json({
            msg: 'El token de Google no es válido'
        });
    }
}

module.exports = {
    loginPost,
    googleSingIn
}