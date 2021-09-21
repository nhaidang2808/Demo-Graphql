const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
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
const NoteModel = mongoose.model('Note', noteSchema);
const UserModel = mongoose.model('User', userSchema);
module.exports = {NoteModel,UserModel};