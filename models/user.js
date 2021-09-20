const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});

const userSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  }
})
const Model = mongoose.model('Note', noteSchema);
const userModel = mongoose.model('User', userSchema);
module.exports = Model;
module.exports = userModel;