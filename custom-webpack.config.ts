import * as webpack from 'webpack';
import * as dotenv from 'dotenv';

const env = dotenv.config().parsed;

if (!env) {
  throw new Error('Unable to load environment variables from .env file');
}

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {} as Record<string, string>);

module.exports = (config: webpack.Configuration) => {
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.DefinePlugin(envKeys));
  return config;
};

