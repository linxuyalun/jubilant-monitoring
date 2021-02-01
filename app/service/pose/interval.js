'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
  async index() {
    return {
      message: 'Hi, egg!',
    };
  }
}

module.exports = HomeService;
