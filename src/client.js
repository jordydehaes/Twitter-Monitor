const dotenv = require("dotenv");
const { TwitterClient } = require("twitter-api-client");

dotenv.config();

const client = new TwitterClient({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  disableCache: true,
});

module.exports = {
  client,
};
