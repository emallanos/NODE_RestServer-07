const { request, response } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } =require('../models');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const showImage = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'usuarios':
            model = await User.findById(id);    
            
            if(!model){
                return res.status(400).json({
                    msg: `No existe un Usuario con el id ${id}`        
                });
            }
            
            break;
        case 'productos':
            model = await Product.findById(id);    
            
            if(!model){
                return res.status(400).json({
                    msg: `No existe un Producto con el id ${id}`        
                });
            }

            break;
        default:
            return res.status(500).json({ msg:'Validacion no contemplada.' });
    }

    if(model.image){
        const patchImage = path.join(__dirname, '../uploads', collection, model.image);
        if(fs.existsSync( patchImage )){
            return res.sendFile( patchImage );
        }
    }

    const patchImageNotFound = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile( patchImageNotFound );
}


const uploadFiles = async (req = request, res = response) => {
    try {
        //imagenes
        const name = await uploadFile( req.files, ['txt','pdf', 'md'], 'textos' );

        res.json({
            name
        });    
    } catch (msg) {
        res.status(400).json({
            msg
        });
    }
}

const updateImage = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'usuarios':
            model = await User.findById(id);    
            
            if(!model){
                return res.status(400).json({
                    msg: `No existe un Usuario con el id ${id}`        
                });
            }
            
            break;
        case 'productos':
            model = await Product.findById(id);    
            
            if(!model){
                return res.status(400).json({
                    msg: `No existe un Producto con el id ${id}`        
                });
            }

            break;
        default:
            return res.status(500).json({ msg:'Validacion no contemplada.' });
    }

    //Limpiar imágenes previas

    if(model.image){
        const patchImage = path.join(__dirname, '../uploads', collection, model.image);
        if(fs.existsSync( patchImage )){
            fs.unlinkSync( patchImage );
        }
    }

    const name = await uploadFile( req.files, undefined, collection );
    model.image = name;
    await model.save();

    res.json( model );
}

const updateImageCloudinary = async (req = request, res = response) => {
    const { id, collection } = req.params;

    let model;

    switch (collection) {
        case 'usuarios':
            model = await User.findById(id);    
            
            if(!model){
                return res.status(400).json({
                    msg: `No existe un Usuario con el id ${id}`        
                });
            }
            
            break;
        case 'productos':
            model = await Product.findById(id);    
            
            if(!model){
                return res.status(400).json({
                    msg: `No existe un Producto con el id ${id}`        
                });
            }

            break;
        default:
            return res.status(500).json({ msg:'Validacion no contemplada.' });
    }

    //** Limpiar imágenes previas */

    if(model.image){
        const nameArr = model.image.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        await cloudinary.uploader.destroy( public_id );
    }

    //** Subir nueva imagen */

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.image = secure_url;
    await model.save();

    res.json( model );
}

module.exports = {
    showImage,
    uploadFiles,
    updateImage,
    updateImageCloudinary
}