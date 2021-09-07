var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var NoteModel = require('../../models/user');
var noteType = require('../types/user').noteType;

// Query
exports.queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      notes: {
        type: new GraphQLList(noteType),
        resolve: function () {
          const notes = NoteModel.find().exec()
          if (!notes) {
            throw new Error('Error')
          }
          return notes
        }
      }
    }
  }
});