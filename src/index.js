import dotenv from "dotenv";
import Discord from "discord.js";
import chalk from "chalk";
import patch from "log-timestamp";
import { createWorker } from "tesseract.js";
import { client } from "./client.js";
import fs from "fs";

dotenv.config();
const discordClient = new Discord.Client();

let twitterAccount = "test";
let channel;
let latestTweet = 0;
let newTweet = 1;
let firstTweet = true;

let readJSON = () => {
  try {
    let path = process.cwd();
    const raw = fs.readFileSync(`${path}/config.json`, "utf8");
    const config = JSON.parse(raw);
    return config;
  } catch (error) {
    console.log(error);
  }
};

const startMonitor = async () => {
  console.log(chalk.bold.rgb(246, 255, 0)("Starting twitter monitor... ⚡"));
  const config = await readJSON();
  twitterAccount = config.account;
  channel = discordClient.channels.cache.get("809499372307611728");
  setInterval(checkTweets, config.interval);
};

const checkTweets = async () => {
  console.log(chalk.blueBright(`Monitoring @${twitterAccount}... 🔎`));
  let data;
  try {
    data = await client.tweets.statusesUserTimeline({
      screen_name: twitterAccount,
      count: 1,
      include_rts: false,
      exclude_replies: true,
    });
    newTweet = data;
  } catch (error) {
    console.log(error);
  }

  if (latestTweet != newTweet[0].id) {
    if (firstTweet) {
      firstTweet = false;
      latestTweet = newTweet[0].id;
      return;
    } else {
      console.log(
        chalk.bold.rgb(
          30,
          255,
          0
        )(`New tweet (${newTweet[0].id}) found 🤑! Sent to discord. `)
      );
      if (newTweet[0].hasOwnProperty("extended_entities")) {
        console.log(chalk.bold.rgb(127, 3, 252)("Image detected..."));
        sendEmbed(newTweet);
        sendImageEmbed(newTweet);
        solveOCR(newTweet);
      } else {
        sendEmbed(newTweet);
      }
      latestTweet = newTweet[0].id;
    }
  } else {
    newTweet = data;
  }
};

const sendEmbed = async (tweetData) => {
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

const sendImageEmbed = async (tweetData) => {
  const newTweetEmbed = new Discord.MessageEmbed()
    .setColor("#03bafc")
    .setImage(tweetData[0].extended_entities.media[0].media_url)
    .setTimestamp()
    .setFooter(
      "Developed by Jordy",
      "https://cdn.discordapp.com/attachments/568532483772252160/809505822056251392/jorders-3.jpg"
    );

  await channel.send(newTweetEmbed);
};

const sendOCREmbed = async (OCR) => {
  const newTweetEmbed = new Discord.MessageEmbed()
    .setColor("#03bafc")
    .addField("**OCR**", OCR)
    .setTimestamp()
    .setFooter(
      "Developed by Jordy",
      "https://cdn.discordapp.com/attachments/568532483772252160/809505822056251392/jorders-3.jpg"
    );

  console.log(chalk.bold.rgb(227, 3, 252)("OCR solved! Sent to discord."));
  await channel.send(newTweetEmbed);
};

const solveOCR = async (tweetData) => {
  console.log(chalk.bold.rgb(127, 3, 252)("Solving OCR... 🔃"));
  const worker = createWorker();

  (async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(
      tweetData[0].extended_entities.media[0].media_url
    );
    sendOCREmbed(text);
    await worker.terminate();
  })();
};

discordClient.login(process.env.BOT_TOKEN);
discordClient.once("ready", startMonitor);
