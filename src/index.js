import dotenv from "dotenv";
import { client } from "./client.js";
import chalk from "chalk";
import patch from "log-timestamp";
import Discord from "discord.js";

dotenv.config();

const discordClient = new Discord.Client();

const twitterAccount = "Jordy_BE_";
let latestTweet = 0;
let newTweet = 1;
let firstTweet = true;

const startMonitor = () => {
  console.log(chalk.bold.rgb(246, 255, 0)("Starting twitter monitor... ⚡"));
  setInterval(checkTweets, 1000);
}

const checkTweets = async () => {
  console.log(chalk.blueBright("Monitoring... 🔎"));
  const data = await client.tweets.statusesUserTimeline({
    screen_name: twitterAccount,
    count: 1,
    include_rts: false,
    exclude_replies: true,
  });
  newTweet = data;
  if (latestTweet != newTweet[0].id) {
    if (firstTweet) {
      firstTweet = false;
      latestTweet = newTweet[0].id;
      return;
    } else {
      console.log(
        chalk.bold.rgb(30, 255, 0)(`New tweet (${newTweet[0].id}) found 🤑! Sent to discord. `)
      );
      sendEmbed(newTweet);
      latestTweet = newTweet[0].id;
    }
  } else {
    newTweet = data;
  }
};

const sendEmbed = async (tweetData) => {
  const channel = discordClient.channels.cache.get("809499372307611728");
  const newTweetEmbed = new Discord.MessageEmbed()
    .setColor("#03bafc")
    .setTitle("Tweet URL")
    .setURL(
      `https://twitter.com/${tweetData[0].user.screen_name}/status/${tweetData[0].id_str}`
    )
    .setAuthor(
      `${tweetData[0].user.screen_name} - ${tweetData[0].user.followers_count} followers`
    )
    .setThumbnail(`${tweetData[0].user.profile_image_url}`)
    .addFields(
      { name: "**Content**", value: `${tweetData[0].text}` },
      {
        name: "**Details**",
        value: `Location: ${tweetData[0].user.location} \nDescription: ${tweetData[0].user.description}`,
      }
    )
    .setTimestamp()
    .setFooter(
      "Developed by Jordy",
      "https://cdn.discordapp.com/attachments/568532483772252160/809505822056251392/jorders-3.jpg"
    );

  await channel.send(newTweetEmbed);
};

discordClient.login(process.env.BOT_TOKEN);
discordClient.once("ready", startMonitor);
