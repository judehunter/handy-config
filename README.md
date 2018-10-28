# Handy Config
A lightweight module that takes care of **hand**ling configs / credentials based on **node environment**
## Usage
Require the module with:
```javascript
var cfg = require('handy-config')();   //in a single file
global.cfg = require('handy-config')();  //globally
if (cfg.error) throw cfg.error;
```
The module will load only the data specific to your NODE_ENV.
This is how your `.cfg` file should look like:
```json
{
  "all": {
    "session_secret": "meatballs",
    "port": 3000
  },
  "production": {
    "port": 80,
    "mongo_url": "mongodb://localhost/prod",
    "mongo_pass": "spaghetti"
  },
  "development": {
    "port": 8080,
    "mongo_url": "mongodb://localhost/dev"
  }
}
```
Fields under `all` apply regardless of `NODE_ENV`, but will get overridden by environment specific fields.

In this example the `port` field doesn't apply (given `NODE_ENV='development'`), because it was already defined.

Given that you set `NODE_ENV` to production, invoking the module returns the following:
```javascript
cfg = {
  port: 80,
  mongo_url: "mongodb://localhost/prod"
  mongo_pass: "spaghetti",
  session_secret: "meatballs"
}
// FYI the module uses the spread operator to handle this
// cfg = {...config.all, ...config.production}
```

You only have to invoke the module once.
```javascript
// app.js
var cfg = require('handy-config')(); //configures the modules and returns the config
// This step cannot be omitted and needs to be done before all other imports

// mongo.js
var cfg = require('handy-config'); //returns the config
```



### Config
You can override the default file name and encoding. Below are the defaults:
```javascript
var cfg = require('handy-config')({
  path: '.cfg',
  encoding: 'utf8'
});
```

### Set your `NODE_ENV` easily

You can add this to your `package.json`
```javascript
"scripts": {
  "dev": "set NODE_ENV=development&& node app",
  "prod": "set NODE_ENV=production&& node app"
}
```
And then just run it in your command line
```pwsh
npm dev
```
This will automatically set your `NODE_ENV` before runtime.


## Install
Run this command in your command line:
```pwsh
npm i handy-config
```


And that's **it**!
