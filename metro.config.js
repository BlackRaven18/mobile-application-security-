require('dotenv').config();
const { mergeConfig } = require('metro-config');
const { getDefaultConfig } = require('expo/metro-config');
const metroObfuscator = require('obfuscator-io-metro-plugin');

const defaultConfig = getDefaultConfig(__dirname);

let metroConfig = defaultConfig;

if (process.env.ENVIRONMENT === 'production') {
  const obfuscator = metroObfuscator(
    {
      // see: https://github.com/javascript-obfuscator/javascript-obfuscator#options
      compact: false,
      sourceMap: false,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1
    },
    {
      runInDev: false,
      logObfuscatedFiles: false
    }
  );

  metroConfig = mergeConfig(defaultConfig, obfuscator); // right side value takes precedence
}

module.exports = metroConfig;