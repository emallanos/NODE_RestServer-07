const { Router } = require('express');
const router = Router();
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/userController');
const { check } = require('express-validator');

const { 
    validateFields,
    validateJWT, 
    isAdminRole, 
    containsRole } = require('../middlewares');

const { itIsValidRole, emailExists, userExistsById, userDeleted } = require('../helpers/db-validators');

router.get('/', [
    validateJWT
], usuariosGet);

router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener 6 caracteres como mínimo').isLength({ min: 6 }),
    check('mail', 'El correo para el usuario ingresado no es válido').isEmail(),
    check('mail').custom( emailExists ),
    check('role').custom( itIsValidRole ),
    validateFields
], usuariosPost);

router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( itIsValidRole ),
    validateFields
], usuariosPut);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    containsRole('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('id').custom( userDeleted ),
    validateFields
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;