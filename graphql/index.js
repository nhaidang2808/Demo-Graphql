// var GraphQLSchema = require('graphql').GraphQLSchema;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var queryType = require('./queries/user').queryType;
// var mutation = require('./mutations/index');

// exports.noteSchema = new GraphQLSchema({
//   query: queryType,
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: mutation
//   })
// })

// var GraphQLSchema = require('graphql').GraphQLSchema;
// var GraphQLObjectType = require('graphql').GraphQLObjectType;
// var queryType = require('./queries/user').queryType;
// var mutation = require('./mutations/index');
var { gql } = require('apollo-server-express');
const NoteModel = require('../models/user.js');
// exports.noteSchema = new GraphQLSchema({
//   query: queryType,
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: mutation
//   })
// })

exports.typedef = gql`

  type Query {
    notes: [NoteType]
    noteDetail(id: String):NoteType
  }

  type Mutation {
    addNote(
      name: String!
      content: String
    ): NoteType
    removeNote(id: String!): NoteType
    updateNote(
      id: String
      name: String
      content: String
    ): NoteType
  }


  input UserInputType {
      name: String
      id: String
  }
  type UserType {
      name: String
      id: String
  }
  type NoteType {
    "id note"
    id: String
    "name note"
    name: String
    # this is commment
    content: String
    user: UserType
  }
`;


exports.resolver = {
  Query: {
    notes: () => {
      const notes = NoteModel.find().exec()
      if (!notes) {
        throw new Error('Error')
      }
      return notes
    },
    noteDetail: (root, args, context) => {
      try {
        return NoteModel.findById(noteId);
      } catch (error) {
        
      }
    }
  },
  Mutation: {
    addNote: (root, params) => {
      try {
        const uModel = new NoteModel(params);
        return uModel.save();
      } catch (error) {
        return error;
      }
    },
    removeNote: async (root, params) => {
      try {
        const newNote = await uModel.save();
        if (!newNote) {
          throw new Error('Error');
        }
        return newNote
      } catch (error) {
        return error;
      }
    },
    updateNote: (root, params) => {
      const uModel = new NoteModel(params);
      const newNote = uModel.save();
      if (!newNote) {
        throw new Error('Error');
      }
      return newNote
    },
  },
}