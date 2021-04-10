const validField = require('../middlewares/validateFields');
const validJWT = require('../middlewares/validate-jwt');
const validRole = require('../middlewares/validate-role');

module.exports = {
    ...validField,
    ...validJWT,
    ...validRole
}