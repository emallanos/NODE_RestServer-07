const { Router } = require('express');
const router = Router();
const { getCategories, 
        getCategory, 
        createCategory, 
        updateCategory, 
        deleteCategory } = require('../controllers/categoriesController');

const { check } = require('express-validator');
const { validateJWT, 
        validateFields, 
        isAdminRole } = require('../middlewares');

const { categoryExistsById, 
        categoryExistsByName, 
        categoryDeleted } = require('../helpers/db-validators');

/**
 * {{url}}/api/categorias
 */

//Obtener todas las categorias - Público
router.get('/', getCategories);

//Obtener una categorias - Público
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( categoryExistsById ),
    check('id').custom( categoryDeleted ),
    validateFields
], getCategory);

//Crear una categoria - Privado - Cualquier persona comom un token válido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

//Actualizar una categoria - Privado - Cualquier persona comom un token válido
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( categoryExistsById ),
    check('name').custom( categoryExistsByName ),
    check('id').custom( categoryDeleted ),
    validateFields
], updateCategory);

//Borrar una categoria - Privado - Solo usuario con ADMIN_ROLE y un token válido
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoryExistsById ),
    check('id').custom( categoryDeleted ),
    validateFields
], deleteCategory);

module.exports = router;