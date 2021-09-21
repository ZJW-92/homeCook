var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
  name: { type: String },
  duration: { type: Number },
  instruction: { type: String }
});

module.exports = mongoose.model('recipes', recipeSchema);


