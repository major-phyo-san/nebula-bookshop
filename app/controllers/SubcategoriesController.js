var envs = require('../../config/server-env');
var database = require('../../config/database');
var Category = require('../models/Category');
var Subcategory = require('../models/Subcategory');

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

module.exports.getAllSubcategories = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();

    Subcategory.find({category: req.params.catId}, (err, subcategories)=>{
        renderContext['csrfToken'] = req.csrfToken();

        var subcategories = subcategories.map((subcategory)=>{
            return {
                id: subcategory._id,
                name: subcategory.name,
                description: subcategory.description
            };
        });
        renderContext['subcategories'] = subcategories;

        res.render('subcategories/index', renderContext);
    });
}

module.exports.showCreateForm = function(req, res){
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
        
        res.render('subcategories/create', renderContext);
    });
}

module.exports.addNewSubcategory = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();
    var createData = {
        name: req.body.name,
        description: req.body.description,
        category: req.body.catId
    };

    var subcategory = new Subcategory(createData);
    subcategory.save((err, data)=>{
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

    Subcategory.findById(req.params.subcatId, (err, subcategory)=>{
        var subcategory = {
            id: subcategory._id,
            name: subcategory.name,
            description: subcategory.description
        }
        renderContext['subcategory'] = subcategory;

        res.render('subcategories/edit', renderContext);
    });
}

module.exports.editSubcategory = function(req, res){
    var updateData = {
        name: req.body.name,
        description: req.body.description
    }
    Subcategory.findByIdAndUpdate(req.params.subcatId, updateData, (err)=>{
        if(err) console.log(err);
        Subcategory.findById(req.params.subcatId, (err, subcategory)=>{
            res.redirect('/categories/' + subcategory.category + '/subcategories');
        });
        
    });
}

module.exports.showDeleteForm = function(req, res){
    renderContext['csrfToken'] = req.csrfToken();

    Subcategory.findById(req.params.subcatId, (err, subcategory)=>{
        var subcategory = {
            id: subcategory._id,
            name: subcategory.name,
            description: subcategory.description
        }
        renderContext['subcategory'] = subcategory;

        res.render('subcategories/delete', renderContext);
    });
}

module.exports.deleteSubcategory = function(req, res){
    catId = null;
    Subcategory.findById(req.params.subcatId, (err, subcategory)=>{
        catId = subcategory.category;
    });

    Subcategory.findByIdAndDelete(req.params.subcatId, (err)=>{
        if(err){
            console.log(err);
        }
        res.redirect('/categories/' + catId + '/subcategories');
    });    
}