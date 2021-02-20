# Twitter-Monitor

Application that monitors a certain Twitter account and sends out a discord embed whenever a new tweet gets tweeted by that account.<br>
OCR is also supported.

## Instructions: NPM Modules
```
npm i chalk
npm i discord.js
npm i dotenv
npm i log-timestamp
npm i tesseract.js
npm i twitter
npm i twitter-api-client
npm i fs
```
## Files: API + Discord bot token

Create a file named .env and define the following things in the format below:
```
API_KEY=yourTwitterAPI
API_SECRET_KEY=yourTwitterAPISecret
ACCESS_TOKEN=yourTwitterAccessToken
ACCESS_TOKEN_SECRET=yourTwitterAccessTokenScret
BOT_TOKEN=yourDiscordBotToken
```
- Save the file
