const { gql } = require("apollo-server");
const { memberships } = require("../enums");

module.exports = {
  typeDefs: gql`
    enum PlatformMembershipType {
      NONE
      XBOX
      PSN
      STEAM
      BLIZZARD
      STADIA
      DEMON
      BUNGIE_NEXT
      ALL
    }

    enum PrivacySetting {
      OPEN
      CLAN_AND_FRIENDS_ONLY
      FRIENDS_ONLY
      INVITATION_ONLY
      CLOSED
    }

    interface PlatformMember {
      membershipId: String!
      membershipType: Int!
      membership: PlatformMembershipType!
    }

    type IgnoreResponse {
      isIgnored: Boolean
      ignoreFlags: Int
    }

    type Application {
      applicationType: Int
      applicationId: Int!
      name: String!
      redirectUrl: String
      link: String
      scope: String
      origin: String
      status: Int
      creationDate: DateTime
      statusChanged: DateTime
    }
  `,
  resolvers: {
    PlatformMember: {
      __resolveType: () => null,

      membership: parent =>
        Object.keys(memberships).find(
          key => memberships[key] === parent.membershipType
        )
    }
  }
};
