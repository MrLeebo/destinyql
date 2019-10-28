const reduce = require("lodash/reduce");
const Scalars = require("graphql-scalars");
const Platform = require("./platform");
const Character = require("./character");
const User = require("./user");
const Profile = require("./profile");
const Schema = require("./schema");

function createSchema() {
  return reduce(
    arguments,
    (accum, type) => {
      accum.typeDefs = [...accum.typeDefs].concat(type.typeDefs);
      accum.resolvers = Object.assign(accum.resolvers, type.resolvers);
      return accum;
    },
    { typeDefs: [], resolvers: {} }
  );
}

module.exports = createSchema(
  Scalars,
  Platform,
  Character,
  User,
  Profile,
  Schema
);
