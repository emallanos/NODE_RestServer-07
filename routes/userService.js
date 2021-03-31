const { Router } = require('express');
const router = Router();
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/userController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { itIsValidRole, emailExists, userExistsById } = require('../helpers/db-validators')

router.get('/', usuariosGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener 6 caracteres como mínimo').isLength({ min: 6 }),
    check('mail', 'El correo para el usuario ingresado no es válido').isEmail(),
    //check('role', 'El rol ingresado no es un tipo de rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('mail').custom( emailExists ),
    check('role').custom( itIsValidRole ),
    validateFields
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    check('role').custom( itIsValidRole ),
    validateFields
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    validateFields
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;