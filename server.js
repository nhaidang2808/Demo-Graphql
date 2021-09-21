const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { typedef } = require('./graphql/index');
const { resolver } = require('./graphql/index');
const mongoose = require('./config/mongoose');
const jwt = require('jsonwebtoken')
const {UserModel} = require('./models/user.js');


async function startApolloServer(typedef, resolver) {
  const app = express();
  app.use(authenticationMiddleware)
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: typedef,
    resolvers: resolver,
    context: ({ req }) => {
      return { req };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    graphiql: true
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  mongoose()
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typedef, resolver);

async function authenticationMiddleware(req, res, next) {
  // console.log('123')
	try {
    const { headers: { authorization } } = req;
    // console.log(authorization)
		if (!authorization) {
      return next();
		}

		const decoded = await jwt.verify(authorization,'abc');
    // console.log({decoded});

    let user = await UserModel.findById(decoded.user._id);
    // console.log(user)
		if (!user) {
			return next();
		}
		Object.assign(req, {
			user,
		});
    // console.log(req.user)
		return next();
	} catch (e) {
		return next();
	}
}

