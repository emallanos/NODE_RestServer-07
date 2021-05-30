const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateUploadFile } = require('../middlewares');
const { showImage, uploadFiles, updateImage, updateImageCloudinary } = require('../controllers/uploadsControllers');
const { allowCollections } = require('../helpers');

const router = Router();

router.get('/:collection/:id', [
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('collection').custom(c => allowCollections(c, ['usuarios', 'productos'])),
    validateFields
], showImage);

router.post('/', validateUploadFile, uploadFiles);

router.put('/:collection/:id', [
    validateUploadFile,
    check('id', 'No es un ID de Mongo válido').isMongoId(),
    check('collection').custom(c => allowCollections(c, ['usuarios', 'productos'])),
    validateFields
], updateImageCloudinary);
//], updateImage);

module.exports = router;
