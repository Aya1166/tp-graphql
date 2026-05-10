const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { addResolversToSchema } = require('@graphql-tools/schema');

const taskSchemaPromise = require('./taskSchema');
const taskResolver = require('./taskResolver');

const app = express();

async function start() {
  const schema = await taskSchemaPromise;

  const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers: taskResolver
  });

  const server = new ApolloServer({
    schema: schemaWithResolvers
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000/graphql");
  });
}

start();