var envs = require('../../config/server-env');
var database = require('../../config/database');
var Category = require('../models/Category');

var optionalConnectionString = {
    authSource: 'admin',
    compressors: 'zlib',
    gssapiServiceName: 'mongodb'
}

var serverOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connection = database.makeMongoDBConnection(optionalConnectionString, serverOptions);

var renderContext = {
    appName: envs.NODE_NAME,
};

module.exports.getAllCategories = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();

    Category.find((err, categories) => {
        var categories = categories.map((category) => {
            return {
                id: category._id,
                name: category.name,
                description: category.description
            }
        });
        renderContext['categories'] = categories;
        
        res.render('categories/index', renderContext);
    });
    
}

module.exports.showCreateForm = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();

    res.render('categories/create', renderContext);
}

module.exports.addNewCategory = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();
    
    var createData = {
        name: req.body.name,
        description: req.body.description
    };

    var category = new Category(createData);
    category.save((err, data)=>{
        if(err){
            console.log('error saving');
            res.send({'message': 'not added'});
        }
        else{
            console.log('saved');
            res.send({'message': 'added'});
        }        
    });
    
}

module.exports.showEditForm = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();

    Category.findById(req.params.catId, (err, category)=>{
        var category = {
            id: category._id,
            name: category.name,
            description: category.description
        }
        renderContext['category'] = category;

        res.render('categories/edit', renderContext);
    });
}

module.exports.editCategory = function(req, res){
    updateData = {
        name: req.body.name,
        description: req.body.description
    };

    Category.findByIdAndUpdate(req.params.catId, updateData, (err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/categories');
    });
}

module.exports.showDeleteForm = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();

    Category.findById(req.params.catId, (err, category)=>{
        var category = {
            id: category._id,
            name: category.name,
            description: category.description
        }
        renderContext['category'] = category;

        res.render('categories/delete', renderContext);
    });
    
}

module.exports.deleteCategory = function(req, res){
    Category.findByIdAndDelete(req.params.catId, (err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/categories');
    });
}

