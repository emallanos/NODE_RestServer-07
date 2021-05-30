const validField = require('../middlewares/validateFields');
const validFile = require('../middlewares/validate-file');
const validJWT = require('../middlewares/validate-jwt');
const validRole = require('../middlewares/validate-role');

module.exports = {
    ...validField,
    ...validFile,
    ...validJWT,
    ...validRole
}