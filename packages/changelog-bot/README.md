heroku config:set APP_ID=11320
heroku config:set PRIVATE_KEY="$(cat changelogbot-private-key.pem)"
heroku config:set WEBHOOK_SECRET=secret

git push heroku master