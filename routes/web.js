var express = require('express');
var router = express.Router();
var envs = require('../config/server-env');

var CategoresController = require('../app/controllers/CategoriesController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {appName: envs.NODE_NAME});
});

/* GET categories listing. */
router.get('/categories', CategoresController.getAllCategories);

router.get('/categories/new', CategoresController.showCreateForm);
router.post('/categories', CategoresController.addNewCategory);

router.get('/categories/:catId/edit', CategoresController.showEditForm);
router.put('/categories/:catId', CategoresController.editCategory);

router.get('/categories/:catId/delete', CategoresController.showDeleteForm);
router.delete('/categories/:catId', CategoresController.deleteCategory);

module.exports = router;