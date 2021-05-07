const Router = require('express');
const { search } = require('../controllers/searchController');


const router = Router();

router.get('/:coleccion/:termino', search);


module.exports = router;