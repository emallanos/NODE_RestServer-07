const Role = require('../models/role');
const User = require('../models/user');

//Verificar si el rol ingresado es válido
const itIsValidRole = async(role = '') => {
    const existeRole = await Role.findOne({ role });
    if(!existeRole){
        throw new Error(`El rol ${ role } no esta registrado en la base de datos.`);
    }
}

//Verificar si el correo existe
const emailExists = async(mail = '') => {
    const existeEmail = await User.findOne({ mail });
    if(existeEmail){
        throw new Error(`El correo ${ mail } para el usuario ingresado ya existe.`);
    }
}

//Verificar si un id existe en base de datos
const userExistsById = async( id ) => {
    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`El id ${ id } no existe.`);
    }
}

module.exports = { itIsValidRole, emailExists, userExistsById };