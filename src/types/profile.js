const { gql } = require("apollo-server");
const { memberships } = require("../enums");

module.exports = {
  typeDefs: gql`
    type LinkedProfile {
      profiles: [ProfileUserInfoCard]
      bnetMembership: UserInfoCard
      profilesWithErrors: [ProfileError]
    }

    type ProfileUserInfoCard implements PlatformMember {
      dateLastPlayed: DateTime
      isOverriden: Boolean
      isCrossSavePrimary: Boolean
      platformSilver: JSONObject
      unpairedGameVersions: Int
      supplementalDisplayName: String
      iconPath: String
      crossSaveOverride: Int
      applicableMembershipTypes: [String]
      isPublic: Boolean
      membershipType: Int!
      membershipId: String!
      membership: PlatformMembershipType!
      displayName: String
      profile: DestinyProfile
    }

    type LinkedProfiles {
      getProfiles(
        membership: PlatformMembershipType!
        id: String!
        getAllMemberships: Boolean
      ): LinkedProfile
    }

    type ProfileError {
      errorCode: Int
      infoCard: UserInfoCard
    }
  `,
  resolvers: {
    ProfileUserInfoCard: {
      profile: async ({ membershipType, membershipId }, _args, ctx) => {
        return ctx.loaders.destinyProfiles.load({
          membershipType,
          membershipId
        });
      }
    },

    LinkedProfiles: {
      getProfiles: (_parent, args, ctx) =>
        ctx.loaders.linkedProfiles.load({
          membershipType: memberships[args.membership],
          membershipId: args.id
        })
    }
  }
};
