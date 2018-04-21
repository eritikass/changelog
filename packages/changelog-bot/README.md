```
heroku config:set APP_ID=11320

heroku config:set PRIVATE_KEY="$(cat changelogbot-private-key.pem)"

heroku config:set WEBHOOK_SECRET=secret

git push heroku master

./node_modules/.bin/probot simulate pull_request test/fixtures/pull_request.labeled.json ./index.js

./node_modules/.bin/probot simulate ping test/fixtures/ping.json ./index.js
```