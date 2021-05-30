const dbValidators = require('./db-validators');
const generateJwt = require('./generate-jwt');
const googleVerify = require('./google-verify');
const shared = require('./shared');
const uploadFile = require('./uploadFile');

module.exports = {
    ...dbValidators,
    ...generateJwt,
    ...googleVerify,
    ...shared,
    ...uploadFile
}