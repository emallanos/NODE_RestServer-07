const { Router } = require('express');
const router = Router();
const { getProducts, 
        getProduct, 
        createProduct, 
        updateProduct, 
        deleteProduct } = require('../controllers/productController');

const { check } = require('express-validator');

const { validateJWT, 
        validateFields, 
        isAdminRole } = require('../middlewares');

const { productExistsById, 
        productExistsByName, 
        productDeleted, 
        categoryExistsById} = require('../helpers/db-validators');

/**
 * {{url}}/api/productos
 */

//Obtener todos los productos - Público
router.get('/', getProducts);

//Obtener un producto - Público
router.get('/:id', [
    validateJWT,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('id').custom( productExistsById ),
    check('id').custom( productDeleted ),
    validateFields
], getProduct);


//Crear un Producto - Privado - Cualquier persona con un token válido
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( productExistsByName ),
    check('category', 'La categoria es obligatoria').not().isEmpty(),
    check('category', 'No es un ID de Mongo válido').isMongoId(),
    check('category').custom( categoryExistsById ),
    validateFields
], createProduct);


//Actualizar un producto - Privado - Cualquier persona comom un token válido
router.put('/:id', [
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    //check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( productExistsById ),
    //check('name').custom( productExistsByName ),
    check('id').custom( productDeleted ),
    validateFields
], updateProduct);

//Borrar un producto - Privado - Solo usuario con ADMIN_ROLE y un token válido
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( productExistsById ),
    check('id').custom( productDeleted ),
    validateFields
], deleteProduct);

module.exports = router;