var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var NoteType = require('../types/user');
var NoteModel = require('../../models/user');

exports.remove = {
  type: NoteType.noteType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removednote = NoteModel.findByIdAndRemove(params.id).exec();
    if (!removednote) {
      throw new Error('Error')
    }
    return removednote;
  }
}