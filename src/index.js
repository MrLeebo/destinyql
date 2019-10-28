const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("graphql-tools");
const schema = require("./types");
const createLoaders = require("./createLoaders");

const server = new ApolloServer({
  schema: makeExecutableSchema({
    ...schema,
    logger: console,
    inheritResolversFromInterfaces: true
  }),

  context: _req => ({
    loaders: createLoaders()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
