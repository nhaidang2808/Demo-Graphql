var { gql } = require('apollo-server-express');
const NoteModel = require('../models/user.js');


exports.typedef = gql`

  type Query {
    notes: [NoteType]
  }

  type Mutation {
    addNote(
      name: String!
      content: String
    ): NoteType
    removeNote(id: String!): NoteType
    updateNote(
      id: String!
      name: String!
      content: String
      ): NoteType
  }

  type NoteType {
    "id note"
    id: String
    "name note"
    name: String
    # this is commment
    content: String
  }

  type UserType {
    id: String
    name: String
    password: String
    token: String
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
    removeNote: (root, params) => {
      try {
        const removednote = NoteModel.findByIdAndRemove(params.id).exec();
        return removednote;
      } catch (error) {
        return error;
      }
    },
    updateNote: (root, params) => {
      try {
        return NoteModel.findByIdAndUpdate(params.id,params, {new: true}).exec();
      } catch (error) {
        return error;
      }
    },
  },
}