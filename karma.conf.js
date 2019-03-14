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
      tsconfig: './tsconfig.json',
      reports: {
        "html": {
          "directory": "coverage"
        }
      }
    },
    reporters: ["dots", "karma-typescript"],
    browsers: ["ChromeHeadless"]
  };

  // Change for CI
  if (process.env.TRAVIS) {
    options.singleRun = true;
    options.karmaTypescriptConfig.reports = {
      "lcovonly": {
        "directory": "coverage",
        "filename": "lcov.info",
        "subdirectory": "lcov"
      }
    };
  }

  // Set the options
  config.set(options);
};