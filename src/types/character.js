const { gql } = require("apollo-server");
const { privacySettings } = require("../enums");
const transform = require("lodash/transform");

const toCharDict = data =>
  transform(
    data,
    (arr, character, characterId) => {
      arr.push({ characterId, character });
    },
    []
  );

module.exports = {
  typeDefs: gql`
    type CharacterByIdComponent {
      data: [CharacterDictionary]
      privacy: PrivacySetting
    }

    type CharacterDictionary {
      characterId: String!
      character: Character!
    }

    type Character implements PlatformMember {
      membershipId: String!
      membershipType: Int!
      membership: PlatformMembershipType!
      characterId: String!
    }
  `,
  resolvers: {
    CharacterByIdComponent: {
      data: parent => toCharDict(parent.data),
      privacy: parent =>
        Object.keys(privacySettings).find(
          setting => privacySettings[setting] === parent.privacy
        )
    }
  }
};
