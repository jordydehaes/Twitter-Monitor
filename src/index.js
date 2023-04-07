const dotenv = require("dotenv");
const { Client } = require("discord.js");
const { getConfig } = require("./config");
const { startMonitor } = require("./twitter");

dotenv.config();

const discordClient = new Client();
const config = getConfig();

discordClient.login(process.env.BOT_TOKEN);
discordClient.once("ready", () => startMonitor(discordClient, config));
