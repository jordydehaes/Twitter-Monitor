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

## Configure config.json
Don't include the @ when changing the account, only the displayname is needed.<br>
The interval determines the number of milliseconds between each request to check for new tweets.
```
{
  "account": "frankwhite9988",
  "interval": 200
}
```

## Dockerize the application
If you want to dockerize the monitor and deploy the container somewhere i have included a basic `Dockerfile` and `.dockerignore` file in the repo.
```
//build the image
docker build -t my-twitter-monitor .

//create container with given image
docker run -d my-twitter-monitor
```
