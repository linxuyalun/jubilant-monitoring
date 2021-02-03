/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };

  // mongodb
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/test',
      options: {},
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1612149515809_7837';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cluster = {
    listen: {
      port: 7100,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
