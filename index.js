const authentication = require('./authentication');
const newCallsTrigger = require('./triggers/new_calls.js');
const newTestTrigger = require('./triggers/new_test.js');
const testTrigger = require('./triggers/test.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  triggers: {
    [newCallsTrigger.key]: newCallsTrigger,
    [newTestTrigger.key]: newTestTrigger,
    [testTrigger.key]: testTrigger,
  },
  authentication: authentication,
};
