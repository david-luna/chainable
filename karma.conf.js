module.exports = function(config) {
  const options = {
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      { pattern: "src/**/*.ts" }
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.json'
    },
    reporters: ["dots", "karma-typescript"],
    browsers: ["Firefox", "Chrome"]
  };

  // Change for CI
  if (process.env.TRAVIS) {
    options.browsers = ['Firefox'];
    options.singleRun = true;
  }

  // Set the options
  config.set(options);
};