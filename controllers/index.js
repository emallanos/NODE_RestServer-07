const authController = require('../controllers/authController');
const categoriesController = require('../controllers/categoriesController');
const productController = require('../controllers/productController');
const roleController = require('../controllers/roleController');
const searchController = require('../controllers/searchController');
const uploadsControllers = require('../controllers/uploadsControllers');
const userController = require('../controllers/userController');

module.exports = {
    ...authController,
    ...categoriesController,
    ...productController,
    ...roleController,
    ...searchController,
    ...uploadsControllers,
    ...userController
}