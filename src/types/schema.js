const { gql } = require("apollo-server");
const client = require("../client");
const { memberships } = require("../enums");

module.exports = {
  typeDefs: gql`
    type Query {
      getBungieApplications: [Application!]!
      linkedProfiles: LinkedProfiles
      searchUsers(q: String!): [GeneralUser!]!
      searchDestinyPlayer(
        membership: PlatformMembershipType!
        name: String!
      ): [ProfileUserInfoCard!]!
    }

    type Mutation {
      helloWorld: String
    }

    schema {
      query: Query
      mutation: Mutation
    }
  `,

  resolvers: {
    Query: {
      getBungieApplications: () => client.get("App/FirstParty"),
      searchUsers: (_parent, args) =>
        client.get(`User/SearchUsers?q=${args.q}`),
      searchDestinyPlayer: (_parent, args, ctx) =>
        ctx.loaders.searchDestinyPlayers.load({
          name: args.name,
          membershipType: memberships[args.membership]
        }),
      linkedProfiles: () => true
    }
  }
};
