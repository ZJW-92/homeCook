var express = require('express');
var router = express.Router();

var Recipe = require('../models/recipe');

router.post('/api/recipes', function(req, res, next) {
    var recipe = new Recipe(req.body);
    recipe.save(function(err, recipe) {
        if (err) { return next(err); }
        res.status(201).json(recipe);
    });
});


router.get('/api/recipes', function(req, res, next) {

    var obj = req.query.sort;
    //sorted
    if(obj){
        Recipe.find({})
                .sort(obj)
                .exec(function (err, recipes) {
                if (err) {
                    return next(err);
                }
                console.log('recipes are');
                if (recipes === null) {
                    console.log('recipes are');
                    return res.status(404).json({
                        'message': 'Recipe not found'
                    });
                }
            res.json({'recipes': recipes }); 
        });

    }else{
        //get all
        Recipe.find(function(err, recipes) {
            if (err) { return next(err); }
            if (recipes === null) {
                return res.status(404).json({'message': 'Recipe not found!'});
            }
            res.json({'recipes': recipes });
        })

    }    
    
});



router.put('/api/recipes/:id', function(req, res, next) {
    var id = req.params.id;
    Recipe.findById(id, function(err, recipe) {
    if (err) { return next(err); }
    if (recipe == null) {
    return res.status(404).json({"message": "Recipe not found"});
    }
    recipe.name = req.body.name;
    recipe.duration = req.body.duration;
    recipe.instruction = req.body.instruction;
    recipe.save();
    res.json(recipe);
    });
});

router.delete('/api/recipes', function(req, res, next) {
    Recipe.deleteMany({}, function(err, recipe) {
        if (err) { return next(err); }
        if(recipe == null) {
            return res.status(404).json({'message': 'Recipe not found'});
        }
        res.json(recipe);
        //res.status(204).json(recipe);
    });
});

router.delete('/api/recipes/:id', function(req, res, next)  { 
    var id = req.params.id;
    Recipe.findOneAndDelete({_id: id}, function(err, recipe){
        if(err) { return next(err); }
        if(recipe == null) {
            return res.status(404).json({'message': 'Recipe not found'});
        }
        res.json(recipe);
    });
});

router.get('/api/recipes/:id', function(req, res, next) {
    var id = req.params.id;
    Recipe.findById(id, function(err, recipe) {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        res.json(recipe);
    });
});

module.exports = router;
