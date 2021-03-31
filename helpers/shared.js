const bcryptjs = require('bcryptjs');

//Encriptar la contraseña con bcriptjs
const encryptPassword = (password) => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

module.exports = { encryptPassword };