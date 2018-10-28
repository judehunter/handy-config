const
path = require('path'),
fs = require('fs');
var cfg;
function handyconfig(options) {
  if (process.env.NODE_ENV===undefined)
    return {
      error: '[Handy Config] ERR: NODE_ENV not specified'
    }
  let cfgPath = path.resolve(process.cwd(), '.cfg');
  let encoding = 'utf8';

  if (options) {
    if (options.path) {
      cfgPath = options.path;
    }
    if (options.encoding) {
      
    }
  }

	try {
    let parsed = JSON.parse(fs.readFileSync(cfgPath, { encoding }));
    let parsedenv = parsed[process.env.NODE_ENV];

    if (!parsed.hasOwnProperty(process.env.NODE_ENV))
      return {
        error: '[Handy Config] ERR: Could not find config for NODE_ENV = ' + process.env.NODE_ENV
      };

    cfg = {...parsed.all, ...parsedenv};
    module.exports = cfg;
    return cfg;
  } catch (error) {
    return {error};
  }
}
module.exports = handyconfig;
