import dotenv from "dotenv";
import { TwitterClient } from "twitter-api-client";

dotenv.config();

export const client = new TwitterClient({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  disableCache: true,
});
