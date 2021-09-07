var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var NoteType = require('../types/user');
var NoteModel = require('../../models/user');

exports.update = {
  type: NoteType.noteType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    return NoteModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name },
        $set: { content: params.content } 
      },
      { new: true }
    )
      .catch(err => new Error(err));
  }
}