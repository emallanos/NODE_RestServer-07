const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost } = require('../controllers/authController');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login', [
    check('mail', 'El correo es obligatorio').not().isEmpty(),
    check('mail', 'El correo para el usuario ingresado no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
] ,loginPost);

module.exports = router;
