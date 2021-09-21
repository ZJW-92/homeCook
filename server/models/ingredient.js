var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ingredientSchema = new Schema({

    name: {
        type: String
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    quantity: {
        type: String
    },
    recipes: {
         type: Schema.Types.ObjectId,
         ref: 'recipes' 
    }
});

module.exports = mongoose.model('ingredients', ingredientSchema);