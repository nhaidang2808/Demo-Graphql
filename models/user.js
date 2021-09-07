var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});
var Model = mongoose.model('Note', noteSchema);
module.exports = Model;