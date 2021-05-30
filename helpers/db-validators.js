const { Category, Role, User, Product } = require('../models');

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

//Verificar si un usuario existe en base de datos por id
const userExistsById = async( id ) => {
    const userExists = await User.findById(id);
    if(!userExists){
        throw new Error(`El id ${ id } no existe.`);
    }
}

//Verificar si un usuario tiene baja lógica en base de datos
const userDeleted = async( id ) => {
    const userDelete = await User.findById(id);
    if(userDelete != null && !userDelete.state){
        throw new Error(`El usuario con id ${ id } fue borrado de BD`);
    }
}

//Verificar si una categoria existe en base de datos por id
const categoryExistsById = async( id ) => {
    const categoryExists = await Category.findById(id);
    if(!categoryExists){
        throw new Error(`El id ${ id } no existe.`);
    }
}

//Verificar si una categoria existe en base de datos por nombre
const categoryExistsByName = async( name = '' ) => {
    const categoryExists = await Category.findOne({ name: name.toUpperCase() });
    if(categoryExists){
        throw new Error(`La categoria con el nombre ${ name } ya existe.`);
    }
}

//Verificar si una categoria tiene baja lógica en base de datos
const categoryDeleted = async( id ) => {
    const categoryDelete = await Category.findById(id);
    if(categoryDelete != null && !categoryDelete.state){
        throw new Error(`La categoria con id ${ id } fue borrada de BD`);
    }
}

//Verificar si un producto existe en base de datos por id
const productExistsById = async( id ) => {
    const productExists = await Product.findById(id);
    if(!productExists){
        throw new Error(`El id ${ id } no existe.`);
    }
}

//Verificar si un producto existe en base de datos por nombre
const productExistsByName = async( name = '' ) => {
    const productExists = await Product.findOne({ name: name.toUpperCase() });
    if(productExists){
        throw new Error(`El producto con el nombre ${ name } ya existe.`);
    }
}

//Verificar si un producto tiene baja lógica en base de datos
const productDeleted = async( id ) => {
    const productDelete = await Product.findById(id);
    if(productDelete != null && !productDelete.state){
        throw new Error(`El producto con id ${ id } fue borrada de BD`);
    }
}

/**
 * Validate Allow Collections
 */
const allowCollections = async( collection = '', collections = [] ) =>{
    const included = collections.includes( collection );

    if( !included ){
        throw new Error(`La colección ${ collection } no es válida. ${ collections }`);
    }

    return true;
}


module.exports = { 
    itIsValidRole, 
    emailExists, 
    userExistsById, 
    userDeleted, 
    categoryExistsById,
    categoryExistsByName,
    categoryDeleted,
    productExistsById,
    productExistsByName,
    productDeleted,
    allowCollections
 };