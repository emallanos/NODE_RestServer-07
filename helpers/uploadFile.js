const { uuid } = require('uuid');
const path = require('path');

const uploadFile = (files, validExtensions = ['jpeg', 'jpg', 'png', 'gif'], folder = '') => {
    return new Promise(( resolve, reject ) => {
        const { archivo } = files;
        const block = archivo.name.split('.');
        const extension = block[block.length - 1];
    
        //Validar la Extension
        if(!validExtensions.includes(extension)){
            return reject(`La extension ${ extension } no es valida - [ ${ validExtensions } ]`);
        }
    
        const temporaryName = uuid.v4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, temporaryName );
    
        archivo.mv(uploadPath, (err) => {
            if (err) { 
                reject(err); 
            }
    
            resolve(temporaryName);
        });
    });
}

module.exports = {
    uploadFile
}