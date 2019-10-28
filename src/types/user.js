const { gql } = require("apollo-server");

module.exports = {
  typeDefs: gql`
    type UserToUserContext {
      isFollowing: Boolean
      ignoreStatus: IgnoreResponse
      globalIgnoreEndDate: DateTime
    }

    type GeneralUser {
      membershipId: String!
      uniqueName: String
      normalizedName: String
      displayName: String
      profilePicture: Int
      profileTheme: Int
      userTitle: Int
      successMessageFlags: String
      isDeleted: Boolean
      about: String
      firstAccess: DateTime
      lastUpdate: DateTime
      legacyPortalUID: String
      context: UserToUserContext
      psnDisplayName: String
      xboxDisplayName: String
      fbDisplayName: String
      showActivity: Boolean
      locale: String
      localeInheritDefault: Boolean
      lastBanReportId: String
      showGroupMessaging: Boolean
      profilePicturePath: String
      profilePictureWidePath: String
      profileThemeName: String
      userTitleDisplay: String
      statusText: String
      statusDate: DateTime
      profileBanExpire: DateTime
      blizzardDisplayName: String
      steamDisplayName: String
    }

    type DestinyProfile {
      characters: CharacterByIdComponent
    }

    type UserInfoCard implements PlatformMember {
      supplementalDisplayName: String
      iconPath: String
      crossSaveOverride: Int
      applicableMembershipTypes: [Int]
      isPublic: Boolean
      membershipType: Int!
      membershipId: String!
      membership: PlatformMembershipType!
      displayName: String
    }
  `,
  resolvers: {}
};
