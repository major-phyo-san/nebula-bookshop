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

module.exports.getAllCategories = function(req, res){
    
    Category.find((err, categories) => {
        var categories = categories.map((category) => {
            return {
                id: category._id,
                name: category.name,
                description: category.description
            }
        });
        res.render('categories/index', { appName: envs.NODE_NAME, csrfToken: req.csrfToken(), categories: categories });
    });
    
}

module.exports.showCreateForm = function(req, res){    
    res.render('categories/create', {csrfToken: req.csrfToken(), appName: envs.NODE_NAME});
}

module.exports.addNewCategory = function(req, res){ 
    var category = new Category({
        name: req.body.name,
        description: req.body.description
    });
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
    Category.findById(req.params.catId, (err, category)=>{
        var category = {
            id: category._id,
            name: category.name,
            description: category.description
        }
        res.render('categories/edit', { appName: envs.NODE_NAME, csrfToken: req.csrfToken(), category: category });
    });
}

module.exports.editCategory = function(req, res){
    Category.findByIdAndUpdate(req.params.catId, {name: req.body.name, description: req.body.description}, (err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/categories');
    });
}

module.exports.showDeleteForm = function(req, res){    
    Category.findById(req.params.catId, (err, category)=>{
        var category = {
            id: category._id,
            name: category.name,
            description: category.description
        }
        res.render('categories/delete', { appName: envs.NODE_NAME, csrfToken: req.csrfToken(), category: category });
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

