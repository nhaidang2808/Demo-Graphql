var { gql } = require("apollo-server-express");
const { NoteModel } = require("../models/user.js");
const { UserModel } = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { where } = require("../models/user.js");

exports.typedef = gql`
  type Query {
    notes: [NoteType]
    users: [UserType]
    myNotes: [NoteType]
  }

  type Mutation {
    addNote(name: String!, content: String): NoteType

    removeNote(id: String!): NoteType

    updateNote(id: String!, name: String!, content: String): NoteType

    signup(id: String, user: String!, password: String!): UserType

    signin(user: String!, password: String!): String
  }

  type NoteType {
    "id note"
    id: String
    "name note"
    name: String
    # this is commment
    content: String
    userId: String
  }

  type UserType {
    "id user"
    id: String
    "username"
    user: String
    "password"
    password: String
  }
`;

exports.resolver = {
  Query: {
    myNotes: (root, params, context) => {
      try {
        const id = context.req.user._id
        const notes = NoteModel.find({userId:id}).exec();
        if (!notes) {
          throw new Error("Error");
        }
        return notes;
      } catch (error) {
        return error;
      }
    },

    notes: () => {
      const notes = NoteModel.find().exec();
      if (!notes) {
        throw new Error("Error");
      }
      return notes;
    },
    users: (root, params, context) => {
      try {
        isAuth(context.req);
        const users = UserModel.find().exec();
        return users;
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    addNote: (root, params, context) => {
      try {
        isAuth(context.req);
        const req = context.req;
        const id = req.user._id;
        params.userId = id;
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
        return NoteModel.findByIdAndUpdate(params.id, params, {
          new: true,
        }).exec();
      } catch (error) {
        return error;
      }
    },

    signup: async (root, params) => {
      try {
        const password = await bcrypt.hash(params.password, 10);
        params.password = password;
        const user = new UserModel(params);
        return user.save();
      } catch (error) {
        return error;
      }
    },

    signin: async (root, params, context) => {
      // console.log(context.req.user)
      // console.log('test')
      try {
        const user = await UserModel.findOne({ user: params.user });
        // console.log(user)
        if (!user) {
          throw new Error("Invalid User");
        }

        const valid = await bcrypt.compare(params.password, user.password);
        // console.log(valid);
        if (!valid) {
          throw new Error("Invalid password");
        }
        const token = jsonwebtoken.sign({ user }, "abc", { expiresIn: "1h" });
        // console.log(token);
        return token;
      } catch (error) {
        return error;
      }
    },
  },
};

function isAuth(req) {
  const user = req.user;
  console.log(user);
  if (!user) {
    throw new Error("Not Auth");
  }
}
