'use strict';

const fs = require('fs');
const path = require('path');

const collect = (v, a) => (a.indexOf(v) < 0 ? [...a, v] : a);
const cloptions = require('commander')
  .option(
    '-b, --browser [browser]',
    'Browser to test with (ChromeHeadless or Chrome)',
    collect,
    []
  )
  .option('-f, --file [file]', 'Spec files to run', collect, [
    'src/**/*-avt.js',
  ])
  .option('-v, --verbose', 'Enables verbose output')
  .parse(process.argv);

module.exports = config => {
  fs.writeFileSync(
    path.resolve(__dirname, '../.aat.yml'),
    fs
      .readFileSync(path.resolve(__dirname, '../.aat.yml.src'), 'utf8')
      .replace(/\${([\w_]+)}/g, (match, token) => process.env[token]),
    'utf8'
  );

  config.set({
    basePath: '..',

    frameworks: ['jasmine', 'AAT'],

    files: cloptions.file,

    exclude: [],

    preprocessors: {
      '{src,a11y}/**/*.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      devtool: 'inline-source-maps',
      module: {
        rules: [
          {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
        ],
      },
    },

    webpackMiddleware: {
      noInfo: !cloptions.verbose,
      stats: cloptions.verbose
        ? {
            colors: true,
          }
        : {},
    },

    customLaunchers: {
      ChromeHeadless_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
      Chrome_Travis: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('@ibma/karma-ibma'),
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader'),
      require('karma-webpack'),
    ],

    reporters: ['spec', 'AAT'],

    port: 9876,

    colors: true,

    logLevel: !cloptions.verbose ? config.LOG_INFO : config.LOG_DEBUG,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    browsers: (cloptions.browser.length === 0
      ? ['ChromeHeadless']
      : cloptions.browser
    ).map(
      browser =>
        `${browser}${
          /^Chrome/i.test(browser) && process.env.TRAVIS ? '_Travis' : ''
        }`
    ),

    concurrency: Infinity,

    customContextFile: 'a11y/context.html',

    customDebugFile: 'a11y/debugContext.html',
  });
};
