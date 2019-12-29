//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '*Spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'https://www.example.com/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
