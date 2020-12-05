var express = require('express');
var router = express.Router();
var envs = require('../config/server-env');

var CategoriesController = require('../app/controllers/CategoriesController');
var SubcategoriesController = require('../app/controllers/SubcategoriesController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {appName: envs.NODE_NAME});
});

/* Categories routes */
router.get('/categories', CategoriesController.getAllCategories);

router.get('/categories/new', CategoriesController.showCreateForm);
router.post('/categories', CategoriesController.addNewCategory);

router.get('/categories/:catId/edit', CategoriesController.showEditForm);
router.put('/categories/:catId', CategoriesController.editCategory);

router.get('/categories/:catId/delete', CategoriesController.showDeleteForm);
router.delete('/categories/:catId', CategoriesController.deleteCategory);

/* Categories routes */
router.get('/categories/:catId/subcategories', SubcategoriesController.getAllSubcategories);

router.get('/subcategories/new', SubcategoriesController.showCreateForm);
router.post('/subcategories', SubcategoriesController.addNewSubcategory);

router.get('/subcategories/:subcatId/edit', SubcategoriesController.showEditForm);
router.put('/subcategories/:subcatId', SubcategoriesController.editSubcategory);

router.get('/subcategories/:subcatId/delete', SubcategoriesController.showDeleteForm);
router.delete('/subcategories/:subcatId', SubcategoriesController.deleteSubcategory);

module.exports = router;