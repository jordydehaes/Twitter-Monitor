const { client } = require("./client.js");
const { sendEmbed, sendImageEmbed } = require("./discord");
const { solveOCR } = require("./ocr");

const checkTweets = async (account, channel, config) => {
  console.log(`Monitoring @${account}... 🔎`);
  let tweetData;
  try {
    tweetData = await client.tweets.statusesUserTimeline({
      screen_name: account,
      count: 1,
      include_rts: false,
      exclude_replies: true,
    });
  } catch (error) {
    console.log(error);
  }

  if (config.latestTweets[account] !== tweetData[0].id) {
    config.latestTweets[account] = tweetData[0].id;
    sendEmbed(channel, tweetData[0]);
    if (tweetData[0].extended_entities) {
      console.log("Image detected...");
      sendImageEmbed(channel, tweetData[0]);
      solveOCR(channel, tweetData[0].extended_entities.media[0].media_url);
    }
  }
};

const startMonitor = async (discordClient, config) => {
  console.log("Starting twitter monitor... ⚡");
  const channel = discordClient.channels.cache.get("568532483772252160");

  // Cache latest tweets initially
  for (const account of config.accounts) {
    try {
      const tweetData = await client.tweets.statusesUserTimeline({
        screen_name: account,
        count: 1,
        include_rts: false,
        exclude_replies: true,
      });
      config.latestTweets[account] = tweetData[0].id;
    } catch (error) {
      console.log(error);
    }
  }

  // Start monitoring
  config.accounts.forEach((account) => {
    setInterval(() => checkTweets(account, channel, config), config.interval);
  });
};

module.exports = { startMonitor };
