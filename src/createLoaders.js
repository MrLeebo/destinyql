const client = require("./client");
const DataLoader = require("dataloader");

const createLoader = batchLoadFn =>
  new DataLoader(batchLoadFn, {
    cacheKeyFn(key) {
      if (typeof key !== "object") {
        return String(key);
      }
      return Object.keys(key)
        .sort()
        .map(k => k + ":" + key[k])
        .join("-");
    }
  });

const batchLoader = keyFn =>
  createLoader(async keys => {
    const results = [];
    for (const key of keys) {
      const data = await client.get(keyFn(key));
      results.push(data);
    }
    return results;
  });

module.exports = function createLoaders() {
  return {
    searchDestinyPlayers: batchLoader(
      key => `Destiny2/SearchDestinyPlayer/${key.membershipType}/${key.name}`
    ),
    destinyProfiles: batchLoader(
      key =>
        `Destiny2/${key.membershipType}/Profile/${
          key.membershipId
        }?components=200`
    ),
    linkedProfiles: batchLoader(
      key =>
        `Destiny2/${key.membershipType}/Profile/${
          key.membershipId
        }/LinkedProfiles`
    )
  };
};
