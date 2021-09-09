// const express = require("express");
// const mongoose = require('./config/mongoose');
// const graphqlHTTP = require('express-graphql').graphqlHTTP;
// const cors = require("cors");
// const db = mongoose();
// const app = express();

// app.use('*', cors());

// const noteSchema = require('./graphql/index').noteSchema;
// app.use('/graphql', cors(), graphqlHTTP({
//   schema: noteSchema,
//   rootValue: global,
//   graphiql: true
// }));

// // Up and Running at Port 4000
// app.listen(process.env.PORT || 4000, () => {
//   console.log('A GraphQL API running at port 4000');
// });

// const express = require("express");
// const mongoose = require('./config/mongoose');
// const graphqlHTTP = require('express-graphql').graphqlHTTP;
// const cors = require("cors");
// const db = mongoose();
// const app = express();

// app.use('*', cors());


// const { makeExecutableSchema } = require('apollo-server-express');
// const { applyMiddleware } = require('graphql-middleware');


// app.use('/graphql', graphqlHTTP({
//   schema: typedef,
//   rootValue: resolver,
//   graphiql: true
// }));

// // Up and Running at Port 4000
// app.listen(process.env.PORT || 4000, () => {
//   console.log('A GraphQL API running at port 4000');
// });

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { typedef } = require('./graphql/index');
const { resolver } = require('./graphql/index');
const mongoose = require('./config/mongoose');


async function startApolloServer(typedef, resolver) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: typedef,
    resolvers: resolver,
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