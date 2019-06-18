# From Me To You

# Welcome!

Welcome to our site! From Me To You, is a fully-functional e-commerce where you can buy personalized care packages. From Me To You® is the modern day gift basket. It's the easy way to gift fun and unique care packages for all occasions with a few clicks. This website was built using Sequelize, Express, Node.js, React, Redux and Material-UI by Taylor Thompson, Colleen Higgins and Audra Kenney.

## Visit

Visit our site at http://from-me-to-you.herokuapp.com/!

## Developer Notes

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

### Deployment

1.  `heroku git:remote your-app-name` You'll need to be a collaborator on the app.

#### Option A: Automatic Deployment via Continuous Integration

(_**NOTE**: This step assumes that you already have Travis-CI testing your code._)

CI is not about testing per se – it's about _continuously integrating_ your changes into the live application, instead of periodically _releasing_ new versions. CI tools can not only test your code, but then automatically deploy your app. Boilermaker comes with a `.travis.yml` configuration almost ready for deployment; follow these steps to complete the job.

1.  Run `git checkout master && git pull && git checkout -b f/travis-deploy` (or use some other new branch name).
2.  Un-comment the bottom part of `.travis.yml` (the `before_deploy` and `deploy` sections)
3.  Add your Heroku app name to `deploy.app`, where it says "YOUR HEROKU APP NAME HERE". For example, if your domain is `cool-salty-conifer.herokuapp.com`, your app name is `cool-salty-conifer`.
4.  Install the Travis CLI tools by following [the instructions here](https://github.com/travis-ci/travis.rb#installation).
5.  Run `travis encrypt $(heroku auth:token) --org` to encrypt your Heroku API key. _**Warning:** do not run the `--add` command suggested by Travis, that will rewrite part of our existing config!_
6.  Copy-paste your encrypted API key into the `.travis.yml` file under `deploy.api_key.secure`, where it says "YOUR ENCRYPTED API KEY HERE".
7.  `git add -A && git commit -m 'travis: activate deployment' && git push -u origin f/travis-deploy`
8.  Make a PR for the new branch, get it approved, and merge it into master.

That's it! From now on, whenever `master` is updated on GitHub, Travis will automatically push the app to Heroku for you.

#### Option B: Manual Deployment from your Local Machine

Some developers may prefer to control deployment rather than rely on automation. Your local copy of the application can be pushed up to Heroku at will, using Boilermaker's handy deployment script:

1.  Make sure that all your work is fully committed and pushed to your master branch on Github.
2.  If you currently have an existing branch called "deploy", delete it now (`git branch -d deploy`). We're going to use a dummy branch with the name "deploy" (see below), so if you have one lying around, the script below will error
3.  `npm run deploy` - this will cause the following commands to happen in order:

* `git checkout -b deploy`: checks out a new branch called "deploy". Note that the name "deploy" here isn't magical, but it needs to match the name of the branch we specify when we push to our heroku remote.
* `webpack -p`: webpack will run in "production mode"
* `git add -f public/bundle.js public/bundle.js.map`: "force" add the otherwise gitignored build files
* `git commit --allow-empty -m 'Deploying'`: create a commit, even if nothing changed
* `git push --force heroku deploy:master`: push your local "deploy" branch to the "master" branch on heroku
* `git checkout master`: return to your master branch
* `git branch -D deploy`: remove the deploy branch

## Customize

Now that you've got the code, follow these steps to get acclimated:

* Update project name and description in `package.json` and `.travis.yml` files
* `npm install`, or `yarn install` - whatever you're into
* Create a postgres database: `grace-shopper`
* Edit the file called `secrets.js` in the project root

  * This file is `.gitignore`'d, and will _only_ be required in your _development_ environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush'
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

* To use OAuth with Google, complete the step above with a real client ID and client secret from Google
  * You can get them here: https://console.developers.google.com/apis/credentials
