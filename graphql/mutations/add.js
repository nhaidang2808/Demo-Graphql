var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var NoteType = require('../types/user');
var NoteModel = require('../../models/user');

exports.add = {
  type: NoteType.noteType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: GraphQLString
    }
  },
  resolve(root, params) {
    const uModel = new NoteModel(params);
    const newNote = uModel.save();
    if (!newNote) {
      throw new Error('Error');
    }
    return newNote
  }
}