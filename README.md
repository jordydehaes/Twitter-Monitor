# Twitter-Monitor

Application that monitors a certain Twitter account and sends out a discord embed whenever a new tweet gets tweeted by that account. OCR is also supported.

## Install Node Modules

```
npm install
```

## Create environment variables file

You need to create a project on the [Twitter developer portal](https://developer.twitter.com/en/portal/dashboard), that'll give you access to an API.<br>
Create a file named `.env` and define the following things in the format below:

```
API_KEY=yourTwitterAPI
API_SECRET_KEY=yourTwitterAPISecret
ACCESS_TOKEN=yourTwitterAccessToken
ACCESS_TOKEN_SECRET=yourTwitterAccessTokenScret
BOT_TOKEN=yourDiscordBotToken
```

Don't forget that you will also need to adjust the channel ID for the webhooks in Discord in `twitter.js`.

## Configure config.json

Don't include the @ when changing the account, only the displayname is needed, you can can include multiple accounts to be monitored at once.<br>
The interval determines the number of milliseconds between each request to check for new tweets.

```
{
  "accounts": ["acc1", "acc2"],
  "latestTweets": {},
  "interval": 5000
}

```

## OCR Google Vision API: setup

To set the OCR up follow these steps:

1. Create a Google Cloud Platform account at https://console.cloud.google.com.
2. Create a new project and enable the Cloud Vision API.
3. Create a service account key with the role of "Project" > "Editor".
4. Download the private key JSON file and rename it to ocr.json.
5. Place the ocr.json file in your project directory.
6. Authenticate your API calls with the ocr.json file.
