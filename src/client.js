const { ApolloError } = require("apollo-server");
const fetch = require("node-fetch");

const options = {
  headers: { "X-API-Key": process.env.API_KEY }
};

module.exports = {
  async get(path) {
    const url = `${process.env.API_URL}/${path}`;
    console.log(`GET /${path}`);

    const res = await fetch(url, options);
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));

    if (json.ErrorCode !== 1) {
      throw new ApolloError(json.Message, json.ErrorStatus, json.MessageData);
    }

    return json.Response;
  }
};
